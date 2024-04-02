from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import os
import numpy as np
import pandas as pd
import pickle

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer

app = Flask(__name__)
CORS(app)
# Load the data
data = pd.read_csv(r"C:\Users\rajd3\Desktop\mini\Backend\updated_dataset.csv")

# Reorder the columns to have "Domain" as the first preference
data = data[['Domain', 'Course Name', 'Difficulty Level', 'Course Rating', 'Course URL']]

# Convert columns to strings before applying string operations
data['Course Name'] = data['Course Name'].astype(str)

# Preprocess the data
data['tags'] = data['Domain'] + ' ' + data['Course Name']

new_df = data[['Domain','tags']]
new_df['tags'] = new_df['tags'].str.replace(',',' ')
new_df.rename(columns = {'Domain':'domain'}, inplace = True)
new_df['tags'] = new_df['tags'].fillna('').apply(lambda x: str(x).lower())

# Stemming function
ps = PorterStemmer()
def stem(text):
    y=[]
    for i in text.split():
        y.append(ps.stem(i))
    return " ".join(y)
new_df['tags'] = new_df['tags'].apply(stem)

# Vectorization
cv = CountVectorizer(max_features=5000,stop_words='english')
vectors = cv.fit_transform(new_df['tags']).toarray()

# Check if the similarity file exists, if not, compute and save it
if os.path.exists(r'C:\Users\rajd3\Desktop\mini\Backend\similarity.pkl'):
    with open(r'C:\Users\rajd3\Desktop\mini\Backend\similarity.pkl', 'rb') as f:
        similarity = pickle.load(f)
else:
    # Compute cosine similarity
    similarity = cosine_similarity(vectors)
    # Store the similarity array in a pickle file
    with open(r'C:\Users\rajd3\Desktop\mini\Backend\similarity.pkl', 'wb') as f:
        pickle.dump(similarity, f)

def recommend(keyword):
    related_courses = new_df[new_df['tags'].str.contains(keyword)]
    if related_courses.empty:
        return []

    similarities = cosine_similarity(cv.transform(related_courses['tags']).toarray(), vectors)
    recommended_courses = []
    recommended_course_indices = set()  # To keep track of recommended course indices
    for i in range(len(similarities)):
        similar_indices = np.argsort(similarities[i])[::-1][1:7]  # Exclude the course itself
        for index in similar_indices:
            if index not in recommended_course_indices:  # Check if course already recommended
                recommended_course_indices.add(index)
                recommended_courses.append(data.iloc[index])
    return recommended_courses

@app.route('/recommend/<keyword>', methods=['GET'])
def get_recommendation(keyword):
    recommended_courses = recommend(keyword)
    if recommended_courses:
        courses = []
        for course in recommended_courses:
            courses.append({
                'Course Name': course['Course Name'],
                'Rating': course['Course Rating'],
                'Difficulty Level': course['Difficulty Level'],
                'Course URL': course['Course URL']
            })
        return jsonify({'courses': courses})
    else:
        return jsonify({'message': 'No courses found related to the keyword'})

if __name__ == '__main__':
    app.run(debug=True)
