<<<<<<< Updated upstream
from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Sample blog data
blog_posts = [
    {
        'id': 1,
        'title': 'Getting Started with Flask: A Beginner\'s Guide',
        'category': 'Technology',
        'author': 'Admin',
        'date': 'May 20, 2024',
        'published_date': '2024-05-20',
        'published_time': '10:30',
        'read_time': '5 min read',
        'views': 256,
        'description': 'Learn the basics of Flask and build your first web application. A step-by-step guide for absolute beginners.',
        'content': 'Flask is a lightweight and flexible Python web framework...',
        'featured_image': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
    },
    {
        'id': 2,
        'title': 'Understanding JavaScript Closures',
        'category': 'Programming',
        'author': 'Admin',
        'date': 'May 16, 2024',
        'published_date': '2024-05-16',
        'published_time': '14:15',
        'read_time': '7 min read',
        'views': 412,
        'description': 'Deep dive into JavaScript closures and how to use them effectively in your code.',
        'content': 'Closures are one of the most important concepts in JavaScript...'
    },
    {
        'id': 3,
        'title': 'UI/UX Design Principles for Better Apps',
        'category': 'Design',
        'author': 'Admin',
        'date': 'May 15, 2024',
        'published_date': '2024-05-15',
        'published_time': '09:45',
        'read_time': '6 min read',
        'views': 398,
        'description': 'Essential design principles that every developer should know.',
        'content': 'Good UI/UX design is crucial for application success...'
    }
]

categories = {
    'Technology': 8,
    'Programming': 7,
    'Design': 4,
    'Lifestyle': 5,
    'Travel': 2,
    'Business': 2
}

popular_posts = [
    {'id': 1, 'title': 'Getting Started with Flask: A Beginner\'s Guide', 'date': 'May 20, 2024'},
    {'id': 2, 'title': 'Understanding JavaScript Closures', 'date': 'May 16, 2024'},
    {'id': 3, 'title': 'UI/UX Design Principles for Better Apps', 'date': 'May 15, 2024'}
]

@app.route('/')
def index():
    """Render the home page with blog posts"""
    return render_template('index.html', 
                         posts=blog_posts, 
                         categories=categories,
                         popular_posts=popular_posts)

@app.route('/create-post')
def create_post():
    """Render the create new post page"""
    return render_template('create_post.html', categories=categories)

@app.route('/post/<int:post_id>/edit')
def edit_post(post_id):
    """Render the edit post page"""
    post = next((p for p in blog_posts if p['id'] == post_id), None)
    if post:
        return render_template('edit_post.html', post=post, categories=categories)
    return "Post not found", 404

@app.route('/post/<int:post_id>')
def view_post(post_id):
    """View a specific blog post"""
    post = next((p for p in blog_posts if p['id'] == post_id), None)
    if post:
        return render_template('post.html', post=post)
    return "Post not found", 404

@app.route('/category/<category>')
def view_category(category):
    """View posts by category"""
    filtered_posts = [p for p in blog_posts if p['category'].lower() == category.lower()]
    return render_template('category.html', 
                         category=category, 
                         posts=filtered_posts,
                         post_count=categories.get(category, 0))

@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page"""
    if request.method == 'POST':
        data = request.get_json()
        # Handle contact form submission
        # In production, you would save this to a database or send an email
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    return render_template('contact.html')

@app.route('/api/search', methods=['GET'])
def search():
    """Search API endpoint"""
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify({'results': []})
    
    results = [p for p in blog_posts if 
               query in p['title'].lower() or 
               query in p['description'].lower()]
    return jsonify({'results': results})

@app.route('/api/posts', methods=['GET'])
def get_posts():
    """Get all posts API"""
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    start = (page - 1) * limit
    end = start + limit
    
    return jsonify({
        'posts': blog_posts[start:end],
        'total': len(blog_posts),
        'page': page,
        'limit': limit
    })

@app.route('/api/posts/<int:post_id>/view', methods=['POST'])
def increment_views(post_id):
    """Increment view count for a post"""
    post = next((p for p in blog_posts if p['id'] == post_id), None)
    if post:
        post['views'] = post.get('views', 0) + 1
        return jsonify({'success': True, 'views': post['views']})
    return jsonify({'success': False}), 404

@app.route('/api/newsletter/subscribe', methods=['POST'])
def subscribe_newsletter():
    """Handle newsletter subscription"""
    data = request.get_json()
    email = data.get('email')
    
    if not email or '@' not in email:
        return jsonify({'success': False, 'message': 'Invalid email'}), 400
    
    # In production, save to database
    return jsonify({'success': True, 'message': 'Subscribed successfully!'})

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    if not os.path.exists('templates'):
        os.makedirs('templates')
    if not os.path.exists('static'):
        os.makedirs('static')
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)
=======
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
>>>>>>> Stashed changes
