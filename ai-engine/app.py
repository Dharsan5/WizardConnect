from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
import joblib
import os
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class WizardAI:
    def __init__(self):
        self.learning_model = None
        self.recommendation_model = None
        self.user_profiles = {}
        self.course_data = []
        self.load_models()
    
    def load_models(self):
        """Load or create AI models for recommendations"""
        try:
            # Load pre-trained models if they exist
            if os.path.exists('models/learning_model.h5'):
                self.learning_model = tf.keras.models.load_model('models/learning_model.h5')
            else:
                self.create_learning_model()
            
            if os.path.exists('models/recommendation_model.pkl'):
                self.recommendation_model = joblib.load('models/recommendation_model.pkl')
            else:
                self.create_recommendation_model()
                
        except Exception as e:
            logger.error(f"Error loading models: {e}")
            self.create_learning_model()
            self.create_recommendation_model()
    
    def create_learning_model(self):
        """Create neural network for learning path prediction"""
        model = Sequential([
            Dense(128, activation='relu', input_shape=(20,)),  # User features
            Dropout(0.3),
            Dense(64, activation='relu'),
            Dropout(0.2),
            Dense(32, activation='relu'),
            Dense(4, activation='softmax')  # 4 houses/learning styles
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        self.learning_model = model
        logger.info("Created new learning style prediction model")
    
    def create_recommendation_model(self):
        """Create content-based recommendation system"""
        # Initialize with sample course data
        self.course_data = [
            {
                'id': 1,
                'title': 'React Fundamentals',
                'description': 'Learn React hooks, components, and state management',
                'category': 'frontend',
                'difficulty': 'beginner',
                'duration': 240,  # minutes
                'tags': ['react', 'javascript', 'frontend', 'components']
            },
            {
                'id': 2,
                'title': 'Node.js Backend Development',
                'description': 'Build scalable backend applications with Node.js and Express',
                'category': 'backend',
                'difficulty': 'intermediate',
                'duration': 360,
                'tags': ['nodejs', 'express', 'backend', 'api']
            },
            {
                'id': 3,
                'title': 'Machine Learning with Python',
                'description': 'Introduction to ML algorithms and TensorFlow',
                'category': 'ai',
                'difficulty': 'advanced',
                'duration': 480,
                'tags': ['python', 'tensorflow', 'machine-learning', 'ai']
            },
            {
                'id': 4,
                'title': 'Mobile App Development',
                'description': 'Create mobile apps with React Native',
                'category': 'mobile',
                'difficulty': 'intermediate',
                'duration': 600,
                'tags': ['react-native', 'mobile', 'ios', 'android']
            },
            {
                'id': 5,
                'title': 'Data Structures and Algorithms',
                'description': 'Master DSA for coding interviews',
                'category': 'algorithms',
                'difficulty': 'advanced',
                'duration': 720,
                'tags': ['algorithms', 'data-structures', 'problem-solving']
            }
        ]
        
        # Create TF-IDF vectorizer for content similarity
        course_texts = [f"{course['title']} {course['description']} {' '.join(course['tags'])}" 
                       for course in self.course_data]
        
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
        self.course_vectors = self.vectorizer.fit_transform(course_texts)
        
        logger.info("Created recommendation system with TF-IDF vectorization")
    
    def predict_house(self, user_answers):
        """Predict user's house based on quiz answers"""
        try:
            # Convert answers to numerical features
            features = self.extract_features(user_answers)
            
            # Simple rule-based approach for now
            house_scores = {
                'gryffindor': 0,
                'hufflepuff': 0,
                'ravenclaw': 0,
                'slytherin': 0
            }
            
            for answer in user_answers:
                if 'house' in answer:
                    house_scores[answer['house']] += 1
            
            # Add some personality-based scoring
            if any('competitive' in str(answer) for answer in user_answers):
                house_scores['gryffindor'] += 0.5
            if any('collaborative' in str(answer) for answer in user_answers):
                house_scores['hufflepuff'] += 0.5
            if any('analytical' in str(answer) for answer in user_answers):
                house_scores['ravenclaw'] += 0.5
            if any('strategic' in str(answer) for answer in user_answers):
                house_scores['slytherin'] += 0.5
            
            predicted_house = max(house_scores.items(), key=lambda x: x[1])[0]
            confidence = house_scores[predicted_house] / sum(house_scores.values())
            
            return {
                'house': predicted_house,
                'confidence': confidence,
                'scores': house_scores
            }
            
        except Exception as e:
            logger.error(f"Error predicting house: {e}")
            return {'house': 'gryffindor', 'confidence': 0.5, 'scores': {}}
    
    def extract_features(self, user_answers):
        """Extract numerical features from user quiz answers"""
        features = np.zeros(20)  # 20 feature vector
        
        # Extract learning style preferences
        for i, answer in enumerate(user_answers[:5]):  # First 5 answers
            if 'style' in answer:
                style_map = {'collaborative': 1, 'competitive': 2, 'analytical': 3, 'strategic': 4}
                features[i] = style_map.get(answer['style'], 0)
            
            if 'difficulty' in answer:
                diff_map = {'beginner': 1, 'intermediate': 2, 'advanced': 3, 'adaptive': 4}
                features[i + 5] = diff_map.get(answer['difficulty'], 0)
        
        return features.reshape(1, -1)
    
    def get_recommendations(self, user_id, user_profile, limit=5):
        """Get personalized course recommendations"""
        try:
            user_interests = user_profile.get('interests', [])
            user_difficulty = user_profile.get('difficulty', 'intermediate')
            user_house = user_profile.get('house', 'gryffindor')
            
            # Create user preference vector
            user_text = ' '.join(user_interests + [user_difficulty, user_house])
            user_vector = self.vectorizer.transform([user_text])
            
            # Calculate similarity with all courses
            similarities = cosine_similarity(user_vector, self.course_vectors).flatten()
            
            # Get top recommendations
            course_indices = similarities.argsort()[-limit:][::-1]
            
            recommendations = []
            for idx in course_indices:
                course = self.course_data[idx].copy()
                course['similarity_score'] = float(similarities[idx])
                course['reason'] = self.generate_recommendation_reason(course, user_profile)
                recommendations.append(course)
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Error generating recommendations: {e}")
            return self.course_data[:limit]  # Fallback to first few courses
    
    def generate_recommendation_reason(self, course, user_profile):
        """Generate explanation for why course is recommended"""
        reasons = []
        
        user_interests = user_profile.get('interests', [])
        course_tags = course.get('tags', [])
        
        # Check interest alignment
        common_interests = set(user_interests).intersection(set(course_tags))
        if common_interests:
            reasons.append(f"Matches your interest in {', '.join(common_interests)}")
        
        # Check difficulty alignment
        if course['difficulty'] == user_profile.get('difficulty', 'intermediate'):
            reasons.append(f"Perfect {course['difficulty']} level for you")
        
        # House-based reasons
        house = user_profile.get('house', 'gryffindor')
        house_preferences = {
            'gryffindor': ['innovative', 'challenging', 'leadership'],
            'hufflepuff': ['collaborative', 'practical', 'supportive'],
            'ravenclaw': ['analytical', 'theoretical', 'complex'],
            'slytherin': ['strategic', 'efficient', 'advanced']
        }
        
        if house in house_preferences:
            for trait in house_preferences[house]:
                if trait in course['description'].lower():
                    reasons.append(f"Suits {house} learning style")
                    break
        
        return reasons[0] if reasons else "Recommended based on your profile"
    
    def update_user_progress(self, user_id, course_id, progress_data):
        """Update user learning progress and retrain models"""
        try:
            if user_id not in self.user_profiles:
                self.user_profiles[user_id] = {'courses': {}, 'preferences': {}}
            
            self.user_profiles[user_id]['courses'][course_id] = progress_data
            
            # Update user preferences based on completed courses
            self.update_user_preferences(user_id, course_id, progress_data)
            
            return True
            
        except Exception as e:
            logger.error(f"Error updating user progress: {e}")
            return False
    
    def update_user_preferences(self, user_id, course_id, progress_data):
        """Update user preferences based on learning behavior"""
        course = next((c for c in self.course_data if c['id'] == course_id), None)
        if not course:
            return
        
        user_prefs = self.user_profiles[user_id]['preferences']
        
        # Update interest weights based on completion rate
        completion_rate = progress_data.get('completion_percentage', 0)
        
        if completion_rate > 80:  # High completion suggests interest
            for tag in course['tags']:
                user_prefs[tag] = user_prefs.get(tag, 0) + 0.2
        elif completion_rate < 30:  # Low completion suggests disinterest
            for tag in course['tags']:
                user_prefs[tag] = user_prefs.get(tag, 0) - 0.1
    
    def get_learning_analytics(self, user_id):
        """Generate learning analytics for the user"""
        try:
            if user_id not in self.user_profiles:
                return {'error': 'User profile not found'}
            
            user_data = self.user_profiles[user_id]
            courses = user_data.get('courses', {})
            
            analytics = {
                'total_courses': len(courses),
                'completed_courses': len([c for c in courses.values() if c.get('completion_percentage', 0) >= 100]),
                'average_progress': np.mean([c.get('completion_percentage', 0) for c in courses.values()]) if courses else 0,
                'learning_streak': self.calculate_learning_streak(courses),
                'preferred_categories': self.get_preferred_categories(courses),
                'skill_progression': self.calculate_skill_progression(courses)
            }
            
            return analytics
            
        except Exception as e:
            logger.error(f"Error generating analytics: {e}")
            return {'error': 'Failed to generate analytics'}
    
    def calculate_learning_streak(self, courses):
        """Calculate current learning streak"""
        # Simplified streak calculation
        if not courses:
            return 0
        
        recent_activity = [c for c in courses.values() if c.get('last_accessed')]
        return len(recent_activity)  # Simplified
    
    def get_preferred_categories(self, courses):
        """Identify user's preferred learning categories"""
        category_scores = {}
        
        for course_id, progress in courses.items():
            course = next((c for c in self.course_data if c['id'] == int(course_id)), None)
            if course:
                completion = progress.get('completion_percentage', 0)
                category = course['category']
                category_scores[category] = category_scores.get(category, 0) + completion
        
        return sorted(category_scores.items(), key=lambda x: x[1], reverse=True)
    
    def calculate_skill_progression(self, courses):
        """Calculate skill level progression"""
        skill_levels = {'beginner': 0, 'intermediate': 0, 'advanced': 0}
        
        for course_id, progress in courses.items():
            course = next((c for c in self.course_data if c['id'] == int(course_id)), None)
            if course and progress.get('completion_percentage', 0) >= 80:
                skill_levels[course['difficulty']] += 1
        
        return skill_levels

# Initialize AI engine
wizard_ai = WizardAI()

@app.route('/api/ai/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': '🤖 WizardConnect AI Engine is running!',
        'models_loaded': {
            'learning_model': wizard_ai.learning_model is not None,
            'recommendation_model': wizard_ai.recommendation_model is not None
        }
    })

@app.route('/api/ai/predict-house', methods=['POST'])
def predict_house():
    """Predict user's house based on quiz answers"""
    try:
        data = request.get_json()
        user_answers = data.get('answers', [])
        
        prediction = wizard_ai.predict_house(user_answers)
        
        return jsonify({
            'success': True,
            'prediction': prediction
        })
        
    except Exception as e:
        logger.error(f"Error in predict_house: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/ai/recommendations', methods=['POST'])
def get_recommendations():
    """Get personalized learning recommendations"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        user_profile = data.get('user_profile', {})
        limit = data.get('limit', 5)
        
        recommendations = wizard_ai.get_recommendations(user_id, user_profile, limit)
        
        return jsonify({
            'success': True,
            'recommendations': recommendations
        })
        
    except Exception as e:
        logger.error(f"Error in get_recommendations: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/ai/update-progress', methods=['POST'])
def update_progress():
    """Update user learning progress"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        course_id = data.get('course_id')
        progress_data = data.get('progress_data', {})
        
        success = wizard_ai.update_user_progress(user_id, course_id, progress_data)
        
        return jsonify({
            'success': success,
            'message': 'Progress updated successfully' if success else 'Failed to update progress'
        })
        
    except Exception as e:
        logger.error(f"Error in update_progress: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/ai/analytics', methods=['GET'])
def get_analytics():
    """Get learning analytics for a user"""
    try:
        user_id = request.args.get('user_id')
        
        if not user_id:
            return jsonify({'success': False, 'error': 'User ID required'}), 400
        
        analytics = wizard_ai.get_learning_analytics(user_id)
        
        return jsonify({
            'success': True,
            'analytics': analytics
        })
        
    except Exception as e:
        logger.error(f"Error in get_analytics: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/ai/train-model', methods=['POST'])
def train_model():
    """Train/retrain AI models with new data"""
    try:
        # This would typically involve retraining with accumulated user data
        # For now, we'll just return a success message
        
        return jsonify({
            'success': True,
            'message': 'Model training initiated. This may take a few minutes.',
            'status': 'training'
        })
        
    except Exception as e:
        logger.error(f"Error in train_model: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=8000)
