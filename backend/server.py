# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# import torch

# app = Flask(__name__)
# CORS(app)
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

# # Load the model and tokenizer
# print("Loading model...")
# tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-xl")
# model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-xl", device_map="auto", torch_dtype=torch.float16)
# print("Model loaded successfully!")

# def chunk_and_generate(prompt, model, tokenizer, max_chunk_length=512):
#     """Generate text in chunks to handle longer inputs"""
#     inputs = tokenizer(prompt, return_tensors="pt", max_length=max_chunk_length, truncation=True).to(model.device)
#     outputs = model.generate(
#         inputs["input_ids"],
#         max_length=1024,
#         min_length=512,
#         temperature=0.7,
#         top_p=0.9,
#         top_k=50,
#         num_beams=4,
#         no_repeat_ngram_size=3,
#         length_penalty=1.0,
#         early_stopping=True,
#         do_sample=True  # Enable sampling
#     )
#     return tokenizer.decode(outputs[0], skip_special_tokens=True)

# @app.route('/api/generate-report', methods=['POST'])
# def generate_report():
#     try:
#         data = request.json
#         print("Received data:", data)  # Debug log
#         academic_info = data['academicInfo']
#         answers = data['answers']

#         questions = [
#             "What is your primary goal in studying?",
#             "Do you prefer studying alone or in groups?",
#             "Which subject do you find most interesting?",
#             "How many hours do you study daily?",
#             "Do you follow a study schedule?",
#             "What learning resources do you use?",
#             "How do you prepare for exams?",
#             "What are your extracurricular activities?",
#             "How do you manage your time?",
#             "What motivates you to study?",
#             "What are your career aspirations?",
#             "How do you handle stress?",
#             "What is your learning style?",
#             "Do you procrastinate?",
#             "What is your proudest academic achievement?"
#         ]

#         formatted_responses = "\n".join(
#             [f"Question: {questions[i]}\nAnswer: {answers[i]}" for i in range(len(answers))]
#         )

#         prompt = f"""
# Task: Generate a comprehensive career guidance report based on the following student profile.

# STUDENT PROFILE
# Academic Performance:
# {academic_info}

# Student Questionnaire:
# {formatted_responses}

# Please provide a detailed professional report with the following sections:

# 1. EXECUTIVE SUMMARY
# ...
# 6. ACTION PLAN
# """
#         report = chunk_and_generate(prompt, model, tokenizer)
#         report = report.replace("*", "").strip()
#         return jsonify({"success": True, "report": report})

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"success": False, "error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=3001, debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# import torch
# from typing import List, Dict
# import re

# app = Flask(__name__)
# CORS(app)
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# class CareerGuidanceSystem:
#     def __init__(self):
#         print("Loading model...")
#         self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-xl")
#         self.model = AutoModelForSeq2SeqLM.from_pretrained(
#             "google/flan-t5-xl",
#             device_map="auto",
#             torch_dtype=torch.float16
#         )
#         print("Model loaded successfully!")
        
#     def analyze_academic_strengths(self, academic_info: str) -> List[str]:
#         """Extract and analyze academic strengths from the academic info."""
#         strengths = []
#         # Extract scores using regex
#         scores = re.findall(r'(\d+)%\s+in\s+([A-Za-z]+)', academic_info)
#         for score, subject in scores:
#             if int(score) >= 85:
#                 strengths.append(f"Strong performance in {subject}")
#         return strengths

#     def analyze_career_alignment(self, answers: List[str]) -> Dict[str, List[str]]:
#         """Analyze career aspirations and skills alignment."""
#         career_aspects = {
#             'interests': [],
#             'skills': [],
#             'learning_style': [],
#             'areas_for_improvement': []
#         }
        
#         # Analyze career aspirations (11th answer)
#         career_aspects['interests'].append(answers[10])
        
#         # Analyze learning style (13th answer)
#         career_aspects['learning_style'].append(answers[12])
        
#         # Check for time management and procrastination (9th and 14th answers)
#         if "effectively" in answers[8].lower():
#             career_aspects['skills'].append("Good time management")
#         else:
#             career_aspects['areas_for_improvement'].append("Time management")
            
#         if "yes" in answers[13].lower():
#             career_aspects['areas_for_improvement'].append("Procrastination management")
            
#         return career_aspects

#     def generate_structured_prompt(self, academic_info: str, answers: List[str]) -> str:
#         """Generate a structured prompt for better report generation."""
#         strengths = self.analyze_academic_strengths(academic_info)
#         career_analysis = self.analyze_career_alignment(answers)
        
#         prompt = f"""
# Generate a professional career guidance report with the following structured sections:

# 1. EXECUTIVE SUMMARY
# - Academic Performance Overview
# - Key Strengths: {', '.join(strengths)}
# - Career Interests: {', '.join(career_analysis['interests'])}

# 2. SKILLS ASSESSMENT
# - Technical Skills
# - Soft Skills: {', '.join(career_analysis['skills'])}
# - Learning Style: {', '.join(career_analysis['learning_style'])}

# 3. CAREER PATH ANALYSIS
# - Primary Career Interest: {career_analysis['interests'][0]}
# - Required Qualifications
# - Industry Trends
# - Potential Roles

# 4. ACADEMIC ALIGNMENT
# {academic_info}
# - Subject Performance Analysis
# - Relevance to Career Goals

# 5. DEVELOPMENT AREAS
# - Areas for Improvement: {', '.join(career_analysis['areas_for_improvement'])}
# - Recommended Skills Development

# 6. ACTION PLAN
# - Short-term Goals (0-6 months)
# - Medium-term Goals (6-12 months)
# - Long-term Goals (1-3 years)
# - Specific Action Items
# """
#         return prompt

#     def generate_report(self, prompt: str) -> str:
#         """Generate the report with improved parameters."""
#         inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True).to(self.model.device)
        
#         outputs = self.model.generate(
#             inputs["input_ids"],
#             max_length=1024,
#             min_length=512,
#             temperature=0.8,  # Slightly increased for more creativity
#             top_p=0.92,
#             top_k=50,
#             num_beams=5,  # Increased for better coherence
#             no_repeat_ngram_size=3,
#             length_penalty=1.2,  # Adjusted to favor slightly longer outputs
#             early_stopping=True,
#             do_sample=True
#         )
        
#         report = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
#         # Clean and format the report
#         report = self.format_report(report)
#         return report

#     def format_report(self, report: str) -> str:
#         """Clean and format the generated report."""
#         # Remove any redundant whitespace and special characters
#         report = re.sub(r'\s+', ' ', report)
#         report = report.replace('*', '')
        
#         # Ensure proper section breaks
#         sections = ['EXECUTIVE SUMMARY', 'SKILLS ASSESSMENT', 'CAREER PATH ANALYSIS', 
#                    'ACADEMIC ALIGNMENT', 'DEVELOPMENT AREAS', 'ACTION PLAN']
        
#         formatted_report = report
#         for section in sections:
#             formatted_report = formatted_report.replace(section, f"\n\n{section}\n")
            
#         return formatted_report.strip()

# # Initialize the career guidance system
# guidance_system = CareerGuidanceSystem()

# @app.route('/api/generate-report', methods=['POST'])
# def generate_report():
#     try:
#         data = request.json
#         academic_info = data['academicInfo']
#         answers = data['answers']
        
#         # Generate structured prompt
#         prompt = guidance_system.generate_structured_prompt(academic_info, answers)
        
#         # Generate and format report
#         report = guidance_system.generate_report(prompt)
        
#         return jsonify({
#             "success": True,
#             "report": report
#         })

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({
#             "success": False,
#             "error": str(e),
#             "details": "An error occurred while generating the report"
#         }), 500

# if __name__ == '__main__':
#     app.run(port=3001, debug=True)


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# import os
# from datetime import datetime

# app = Flask(__name__)
# CORS(app)
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

# # Initialize Gemini API
# GEMINI_API_KEY = "AIzaSyBOhrXZr-4HrjfKuJdfc_6ZoHXNI7Pilj0"  # Replace with your actual API key
# genai.configure(api_key=GEMINI_API_KEY)

# # Configure the model
# generation_config = {
#     "temperature": 0.9,
#     "top_p": 1,
#     "top_k": 40,
#     "max_output_tokens": 4096,  # Increased output tokens for a longer document
# }

# safety_settings = [
#     {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
# ]

# model = genai.GenerativeModel(
#     model_name="gemini-pro",
#     generation_config=generation_config,
#     safety_settings=safety_settings
# )

# def format_report_sections(content):
#     """Format the report into clear sections with proper spacing."""
#     lines = content.split('\n')
#     formatted_sections = []
#     current_section = []

#     for line in lines:
#         line = line.strip()
#         if not line:
#             continue

#         # Check if line is a main heading
#         if line.startswith(('EXECUTIVE SUMMARY', 'ACADEMIC PERFORMANCE', 'CAREER OPTIONS', 
#                             'SKILL DEVELOPMENT', 'PERSONALIZED ADVICE', 'ACTION PLAN')):
#             if current_section:
#                 formatted_sections.append('\n'.join(current_section))
#             current_section = [line]
#         else:
#             current_section.append(line)

#     if current_section:
#         formatted_sections.append('\n'.join(current_section))

#     return 'Career Guidance Report\n' + '\n\n'.join(formatted_sections)

# @app.route('/api/generate-report', methods=['POST'])
# def generate_report():
#     try:
#         data = request.json

#         # Validate input
#         academic_info = data.get('academicInfo', '').strip()
#         answers = data.get('answers', [])

#         if not academic_info or not answers or len(answers) != 15:
#             return jsonify({
#                 "success": False, 
#                 "error": "Invalid input data. Please provide academic info and 15 answers."
#             }), 400

#         # Questions for context
#         questions = [
#             "What is your primary goal in studying?",
#             "Do you prefer studying alone or in groups?",
#             "Which subject do you find most interesting?",
#             "How many hours do you study daily?",
#             "Do you follow a study schedule?",
#             "What learning resources do you use?",
#             "How do you prepare for exams?",
#             "What are your extracurricular activities?",
#             "How do you manage your time?",
#             "What motivates you to study?",
#             "What are your career aspirations?",
#             "How do you handle stress?",
#             "What is your learning style?",
#             "Do you procrastinate?",
#             "What is your proudest academic achievement?"
#         ]

#         # Format responses with clear structure
#         formatted_responses = "\n".join(
#             f"Q{i+1}. {questions[i]}\nA: {answers[i]}" 
#             for i in range(len(answers))
#         )

#         prompt = f"""
# Based on the following student profile, generate a detailed career guidance report in the exact format specified below.
# Use natural paragraphs without bullet points.

# STUDENT PROFILE:
# Academic Performance:
# {academic_info}

# Student Responses:
# {formatted_responses}

# Generate the report in this exact format:

# Career Guidance Report

# EXECUTIVE SUMMARY
# [Write 2-3 paragraphs introducing the student's profile, key strengths, and main recommendations. Focus on their academic performance, 
# learning style, and career goals.]

# ACADEMIC PERFORMANCE ANALYSIS
# [Write 2-3 paragraphs analyzing their academic achievements, patterns in subject performance, and specific recommendations for improvement. 
# Include actionable suggestions.]

# CAREER OPTIONS SUITABILITY
# [Write 2-3 paragraphs discussing suitable career paths based on their interests and strengths. Include specific roles, required 
# qualifications, and pathways.]

# SKILL DEVELOPMENT RECOMMENDATIONS
# [Write 2-3 paragraphs recommending both technical and soft skills to develop. Include specific courses, certifications, and practical 
# ways to gain these skills.]

# PERSONALIZED ADVICE
# [Write 2-3 paragraphs providing specific advice on learning style optimization, study habits, and time management strategies. Make 
# recommendations practical and actionable.]

# ACTION PLAN
# [Write 3 paragraphs outlining specific goals and steps for: 
# 1) Short-term (3-6 months)
# 2) Medium-term (1-2 years)
# 3) Long-term (3-5 years)]

# Important: Write in clear paragraphs without using bullet points or lists. Each section should flow naturally and be easy to read."""

#         # Generate response using Gemini
#         response = model.generate_content(prompt)

#         if response.parts:
#             report_content = response.parts[0].text
#             formatted_report = format_report_sections(report_content)

#             return jsonify({
#                 "success": True,
#                 "report": formatted_report,
#                 "generated_at": datetime.now().isoformat()
#             })
#         else:
#             return jsonify({
#                 "success": False,
#                 "error": "Failed to generate report content"
#             }), 500

#     except Exception as e:
#         print(f"Error generating report: {str(e)}")
#         return jsonify({
#             "success": False,
#             "error": f"An error occurred: {str(e)}"
#         }), 500

# if __name__ == '__main__':
#     app.run(port=3001, debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# from datetime import datetime
# import re  # Added the missing import

# app = Flask(__name__)
# CORS(app)
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# GEMINI_API_KEY = "AIzaSyBOhrXZr-4HrjfKuJdfc_6ZoHXNI7Pilj0"
# genai.configure(api_key=GEMINI_API_KEY)

# generation_config = {
#     "temperature": 0.8,  # Slightly reduced for more consistent output
#     "top_p": 1,
#     "top_k": 40,
#     "max_output_tokens": 8192,
# }

# safety_settings = [
#     {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
# ]

# model = genai.GenerativeModel(
#     model_name="gemini-pro",
#     generation_config=generation_config,
#     safety_settings=safety_settings
# )

# def analyze_academic_strengths(academic_info):
#     """Analyze academic information to identify key strengths."""
#     strengths = []
#     subjects = re.findall(r'(\d+)%\s+in\s+([A-Za-z]+)', academic_info)
    
#     for score, subject in subjects:
#         score = int(score)
#         if score >= 90:
#             strengths.append(f"Exceptional performance in {subject}")
#         elif score >= 85:
#             strengths.append(f"Strong aptitude for {subject}")
    
#     return strengths

# def categorize_responses(answers):
#     """Categorize student responses into key areas."""
#     categories = {
#         "learning_preferences": {
#             "style": answers[12] if len(answers) > 12 else "",
#             "environment": answers[1] if len(answers) > 1 else "",
#             "approach": answers[6] if len(answers) > 6 else ""
#         },
#         "work_ethic": {
#             "study_hours": answers[3] if len(answers) > 3 else "",
#             "schedule": answers[4] if len(answers) > 4 else "",
#             "time_management": answers[8] if len(answers) > 8 else ""
#         },
#         "career_focus": {
#             "interests": answers[2] if len(answers) > 2 else "",
#             "aspirations": answers[10] if len(answers) > 10 else "",
#             "achievements": answers[14] if len(answers) > 14 else ""
#         },
#         "personal_traits": {
#             "motivation": answers[9] if len(answers) > 9 else "",
#             "stress_management": answers[11] if len(answers) > 11 else "",
#             "challenges": answers[13] if len(answers) > 13 else ""
#         }
#     }
#     return categories

# def format_report_sections(content):
#     """Enhanced formatting for the career guidance report."""
#     sections = content.split('\n')
#     formatted_sections = []
#     current_section = []

#     main_headings = [
#         'CAREER GUIDANCE REPORT',
#         'QUICK REFERENCE GUIDE',
#         'EXECUTIVE SUMMARY',
#         'STRENGTHS AND TALENTS',
#         'ACADEMIC EXCELLENCE PATH',
#         'CAREER PATHWAYS',
#         'SKILL DEVELOPMENT ROADMAP',
#         'EDUCATIONAL JOURNEY',
#         'INDUSTRY INSIGHTS',
#         'EXPERIENCE BUILDING',
#         'PROFESSIONAL GROWTH',
#         'FINANCIAL PLANNING',
#         'LIFESTYLE AND BALANCE',
#         'RISK AND OPPORTUNITIES',
#         'DEVELOPMENT TIMELINE',
#         'SUPPORT NETWORK',
#         'ACTION STEPS',
#         'PROGRESS TRACKING',
#         'KEY RECOMMENDATIONS',
#         'RESOURCES AND TOOLS'
#     ]

#     for line in sections:
#         line = line.strip()
#         if not line:
#             continue

#         if any(line.startswith(heading) for heading in main_headings):
#             if current_section:
#                 formatted_sections.append('\n'.join(current_section))
#             current_section = [line]
#         else:
#             current_section.append(line)

#     if current_section:
#         formatted_sections.append('\n'.join(current_section))

#     return '\n\n'.join(formatted_sections)

# @app.route('/api/generate-report', methods=['POST'])
# def generate_report():
#     try:
#         data = request.json
        
#         academic_info = data.get('academicInfo', '')
#         answers = data.get('answers', [])

#         if not academic_info or not answers:
#             return jsonify({
#                 "success": False,
#                 "error": "Invalid input data. Please provide academic info and answers."
#             }), 400

#         # Analyze strengths and categorize responses
#         academic_strengths = analyze_academic_strengths(academic_info)
#         categorized_responses = categorize_responses(answers)

#         prompt = f"""
# Generate a comprehensive, easy-to-understand 30-page career guidance report that speaks to both students and parents.
# Use clear, accessible language while maintaining professional insights.

# STUDENT PROFILE:
# Academic Information: {academic_info}
# Key Strengths: {', '.join(academic_strengths)}

# ASSESSMENT ANALYSIS:
# Learning Preferences: {categorized_responses['learning_preferences']}
# Work Ethic: {categorized_responses['work_ethic']}
# Career Focus: {categorized_responses['career_focus']}
# Personal Traits: {categorized_responses['personal_traits']}

# Generate a detailed report with these sections:

# CAREER GUIDANCE REPORT
# [Professional title page with student name, date, and purpose of the report]

# QUICK REFERENCE GUIDE
# [One-page summary of key points and recommendations for busy parents and students]

# EXECUTIVE SUMMARY
# [Clear overview of the student's profile, potential, and key recommendations]

# STRENGTHS AND TALENTS
# [Detailed analysis of academic and personal strengths, with real-world applications]

# ACADEMIC EXCELLENCE PATH
# [Specific strategies to maximize academic performance and overcome challenges]

# CAREER PATHWAYS
# [Detailed exploration of suitable career options with growth potential]

# SKILL DEVELOPMENT ROADMAP
# [Step-by-step guide to developing essential skills for future success]

# EDUCATIONAL JOURNEY
# [Clear guidance on educational choices and academic requirements]

# INDUSTRY INSIGHTS
# [Current trends and future outlook in relevant career fields]

# EXPERIENCE BUILDING
# [Practical suggestions for gaining relevant experience through internships and projects]

# PROFESSIONAL GROWTH
# [Strategic approach to building professional networks and industry connections]

# FINANCIAL PLANNING
# [Clear breakdown of educational costs and funding options]

# LIFESTYLE AND BALANCE
# [Practical advice on maintaining well-being while pursuing goals]

# RISK AND OPPORTUNITIES
# [Balanced analysis of challenges and opportunities ahead]

# DEVELOPMENT TIMELINE
# [Clear, visual timeline of key milestones and goals]

# SUPPORT NETWORK
# [Guide to utilizing available resources and building support systems]

# ACTION STEPS
# [Specific, actionable steps for immediate implementation]

# PROGRESS TRACKING
# [Framework for monitoring progress and adjusting strategies]

# KEY RECOMMENDATIONS
# [Prioritized list of specific recommendations for success]

# RESOURCES AND TOOLS
# [Curated list of helpful resources, tools, and references]

# For each section:
# 1. Start with a brief overview for parents
# 2. Provide detailed information in clear, simple language
# 3. Include practical examples and real-world applications
# 4. Add specific action items and takeaways
# 5. Use analogies and explanations that both students and parents can understand

# Make the report both comprehensive and accessible, with clear next steps for implementation."""

#         response = model.generate_content(prompt)

#         if response.parts:
#             report_content = response.parts[0].text
#             formatted_report = format_report_sections(report_content)

#             return jsonify({
#                 "success": True,
#                 "report": formatted_report,
#                 "generated_at": datetime.now().isoformat(),
#                 "academic_strengths": academic_strengths,
#                 "assessment_summary": categorized_responses
#             })
#         else:
#             return jsonify({
#                 "success": False,
#                 "error": "Failed to generate report content"
#             }), 500

#     except Exception as e:
#         print(f"Error generating report: {str(e)}")
#         return jsonify({
#             "success": False,
#             "error": f"An error occurred: {str(e)}"
#         }), 500

# if __name__ == '__main__':
#     app.run(port=3001, debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# from datetime import datetime
# import re
# import json

# app = Flask(__name__)
# CORS(app)

# # Configure Gemini AI
# GEMINI_API_KEY = "AIzaSyBOhrXZr-4HrjfKuJdfc_6ZoHXNI7Pilj0"
# genai.configure(api_key=GEMINI_API_KEY)

# generation_config = {
#     "temperature": 0.8,
#     "top_p": 1,
#     "top_k": 40,
#     "max_output_tokens": 8192,
# }

# safety_settings = [
#     {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
#     {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
# ]

# model = genai.GenerativeModel(
#     model_name="gemini-pro",
#     generation_config=generation_config,
#     safety_settings=safety_settings
# )

# def extract_academic_info(academic_info):
#     """Extract academic performance from the academic info string"""
#     grades = {}
#     matches = re.findall(r'(\d+)%\s+in\s+([A-Za-z]+)', academic_info)
#     for grade, subject in matches:
#         grades[subject] = int(grade)
#     return grades

# def categorize_answers(answers):
#     """Categorize the questionnaire answers into relevant sections"""
#     return {
#         "motivation": answers[0],
#         "study_preference": answers[1],
#         "favorite_subject": answers[2],
#         "study_hours": answers[3],
#         "study_routine": answers[4],
#         "resources": answers[5],
#         "exam_prep": answers[6],
#         "extracurricular": answers[7],
#         "time_management": answers[8],
#         "motivation_factors": answers[9],
#         "career_goals": answers[10],
#         "stress_management": answers[11],
#         "learning_style": answers[12],
#         "challenges": answers[13],
#         "achievements": answers[14]
#     }

# def generate_detailed_report(academic_grades, categorized_answers):
#     """Generate a structured report based on the analyzed data"""
#     sections = [
#         {
#             "title": "Academic Performance Analysis",
#             "content": f"Academic Overview:\n" + \
#                       f"- Strong performance across subjects with particular excellence in " + \
#                       ", ".join([f"{subject} ({grade}%)" for subject, grade in academic_grades.items() if grade >= 90]) + "\n" + \
#                       f"- Learning Style: {categorized_answers['learning_style']}\n" + \
#                       f"- Study Commitment: {categorized_answers['study_hours']}"
#         },
#         {
#             "title": "Study Habits and Learning Approach",
#             "content": f"Study Pattern Analysis:\n" + \
#                       f"- Preferred Study Method: {categorized_answers['study_preference']}\n" + \
#                       f"- Resource Utilization: {categorized_answers['resources']}\n" + \
#                       f"- Exam Preparation Strategy: {categorized_answers['exam_prep']}\n" + \
#                       f"- Time Management: {categorized_answers['time_management']}"
#         },
#         {
#             "title": "Career and Personal Development",
#             "content": f"Career Trajectory:\n" + \
#                       f"- Career Aspiration: {categorized_answers['career_goals']}\n" + \
#                       f"- Notable Achievements: {categorized_answers['achievements']}\n" + \
#                       f"- Extracurricular Activities: {categorized_answers['extracurricular']}"
#         },
#         {
#             "title": "Recommendations",
#             "content": "Based on your profile:\n" + \
#                       "1. Academic Focus Areas\n" + \
#                       "2. Study Strategy Optimization\n" + \
#                       "3. Career Preparation Steps\n" + \
#                       "4. Personal Development Goals"
#         }
#     ]
#     return sections

# @app.route('/api/generate-report', methods=['POST'])
# def generate_report():
#     try:
#         data = request.json
#         if not data or 'academicInfo' not in data or 'answers' not in data:
#             return jsonify({
#                 "success": False,
#                 "error": "Invalid data format. Both academicInfo and answers are required."
#             }), 400

#         # Extract and analyze academic information
#         academic_grades = extract_academic_info(data['academicInfo'])
#         categorized_answers = categorize_answers(data['answers'])

#         # Generate the initial report structure
#         report_sections = generate_detailed_report(academic_grades, categorized_answers)

#         # Generate AI recommendations using Gemini
#         prompt = f"""
#         Based on the following student profile, provide detailed recommendations:
        
#         Academic Performance: {data['academicInfo']}
#         Career Goal: {categorized_answers['career_goals']}
#         Learning Style: {categorized_answers['learning_style']}
#         Current Achievements: {categorized_answers['achievements']}
        
#         Please provide specific recommendations for:
#         1. Academic improvement strategies
#         2. Career preparation steps
#         3. Skill development priorities
#         4. Personal growth opportunities
#         """

#         ai_response = model.generate_content(prompt)
#         ai_recommendations = ai_response.parts[0].text if ai_response.parts else ""

#         # Add AI recommendations to the report
#         report_sections.append({
#             "title": "AI-Powered Recommendations",
#             "content": ai_recommendations
#         })

#         # Prepare the final report
#         final_report = {
#             "metadata": {
#                 "generated_at": datetime.now().isoformat(),
#                 "version": "1.0"
#             },
#             "sections": report_sections
#         }

#         # Save report to file
#         with open('generated_report.json', 'w', encoding='utf-8') as f:
#             json.dump(final_report, f, ensure_ascii=False, indent=4)

#         return jsonify({
#             "success": True,
#             "report": final_report
#         })

#     except Exception as e:
#         print(f"Error generating report: {str(e)}")
#         return jsonify({
#             "success": False,
#             "error": f"An error occurred: {str(e)}"
#         }), 500

# if __name__ == '__main__':
#     app.run(port=3001, debug=True)


# import json
# from datetime import datetime
# import google.generativeai as genai
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Configure Gemini API
# genai.configure(api_key='AIzaSyBOhrXZr-4HrjfKuJdfc_6ZoHXNI7Pilj0')
# model = genai.GenerativeModel('gemini-pro')

# def generate_career_report(user_data):
#     # Extract academic info and answers
#     academic_info = user_data.get('academicInfo', '')
#     answers = user_data.get('answers', [])
    
#     # Create a comprehensive prompt for the AI
#     prompt = f"""
#     Generate a comprehensive career guidance report based on the following information:
    
#     Academic Information:
#     {academic_info}
    
#     Personal Assessment:
#     1. Main goals: {answers[0]}
#     2. Study preferences: {answers[1]}
#     3. Challenging subjects: {answers[2]}
#     4. Study hours: {answers[3]}
#     5. Study routine: {answers[4]}
#     6. Learning resources: {answers[5]}
#     7. Exam preparation: {answers[6]}
#     8. Extracurricular activities: {answers[7]}
#     9. Work-life balance: {answers[8]}
#     10. Motivation: {answers[9]}
#     11. Career aspirations: {answers[10]}
#     12. Stress management: {answers[11]}
#     13. Learning style: {answers[12]}
#     14. Academic support: {answers[13]}
#     15. Achievements: {answers[14]}
    
#     Generate a detailed career guidance report with the following sections:
#     1. EXECUTIVE SUMMARY
#     2. PERSONAL PROFILE
#     3. ACADEMIC ASSESSMENT
#     4. CAREER TRAJECTORY ANALYSIS
#     5. PERSONALITY AND STRENGTHS
#     6. SKILL ASSESSMENT AND DEVELOPMENT
#     7. EDUCATIONAL PATHWAYS
#     8. CAREER OPTIONS AND OPPORTUNITIES
#     9. MARKET ANALYSIS AND INDUSTRY TRENDS
#     10. PRACTICAL EXPERIENCE RECOMMENDATIONS
#     11. NETWORKING AND PROFESSIONAL DEVELOPMENT
#     12. FINANCIAL PLANNING AND EDUCATION
#     13. WORK-LIFE BALANCE CONSIDERATIONS
#     14. RISK ASSESSMENT AND MITIGATION
#     15. TIMELINE AND MILESTONES
#     16. SUPPORT SYSTEM AND RESOURCES
#     17. ACTION PLAN
#     18. MONITORING AND ADJUSTMENT STRATEGY
#     19. CONCLUSION AND NEXT STEPS

#     Format the report in Markdown with proper headings and sections.
#     """
    
#     response = model.generate_content(prompt)
    
#     report = {
#         "timestamp": datetime.now().isoformat(),
#         "content": response.text,
#         "success": True
#     }
    
#     return report

# @app.route('/api/save-user-data', methods=['POST'])
# def save_user_data():
#     try:
#         data = request.json
#         # Save to a file with timestamp
#         timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
#         filename = f'user_data_{timestamp}.json'
#         with open(filename, 'w') as f:
#             json.dump(data, f, indent=4)
#         return jsonify({"success": True, "message": "Data saved successfully"})
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)})

# @app.route('/api/generate-report', methods=['POST'])
# def generate_report():
#     try:
#         user_data = request.json
#         report = generate_career_report(user_data)
#         return jsonify(report)
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)



import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyBOhrXZr-4HrjfKuJdfc_6ZoHXNI7Pilj0"  # Replace with your actual Gemini API key
genai.configure(api_key=GEMINI_API_KEY)

def generate_comprehensive_report(academic_info, answers):
    """Generate a comprehensive career guidance report using Gemini API"""
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""Generate a comprehensive career guidance report based on the following information:

Academic Information: {academic_info}

Interview Responses:
1. Main Goal: {answers[0]}
2. Study Preference: {answers[1]}
3. Most Challenging Subject: {answers[2]}
4. Study Hours: {answers[3]}
5. Study Routine: {answers[4]}
6. Learning Resources: {answers[5]}
7. Exam Preparation: {answers[6]}
8. Extracurricular Activities: {answers[7]}
9. Balancing Responsibilities: {answers[8]}
10. Motivation: {answers[9]}
11. Career Aspirations: {answers[10]}
12. Stress Management: {answers[11]}
13. Learning Style: {answers[12]}
14. Seeking Help: {answers[13]}
15. Academic Achievement: {answers[14]}

Guidelines for the report:
- Create a structured, professional career guidance report
- Include sections like Executive Summary, Academic Assessment, Career Trajectory, etc.
- Provide actionable recommendations
- Use Markdown formatting
- Make the report comprehensive yet concise
- Tailor recommendations to the student's profile
"""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating report: {e}")
        return None

@app.route('/api/generate-report', methods=['POST'])
def generate_report():
    try:
        data = request.json
        academic_info = data.get('academicInfo', '')
        answers = data.get('answers', [])
        
        if not academic_info or not answers:
            return jsonify({"success": False, "error": "Invalid input data"})
        
        report = generate_comprehensive_report(academic_info, answers)
        
        if report:
            return jsonify({
                "success": True, 
                "report": report
            })
        else:
            return jsonify({"success": False, "error": "Report generation failed"})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)