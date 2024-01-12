from flask import Flask, session, render_template, request, redirect, url_for
import pymysql
import openai

app = Flask(__name__)
app.secret_key = 'secret'

openai.api_key = "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"

db = pymysql.connect(
    host='localhost',
    user='root',
    password='Appu-0606',
    db='virtual_lab'
)

@app.route('/home')
@app.route('/home/<name>')
def index(name=None):
    user_id = session.get('user')
    if user_id:
        cursor = db.cursor()
        cursor.execute(f"SELECT login_details.username, user_data.courses_assigned, user_data.in_progress, user_data.course_comp, user_data.grade FROM login_details JOIN user_data ON login_details.user_id=user_data.user_id WHERE login_details.user_id={user_id};")
        result = cursor.fetchone()
        if result:
            print(result)
            username = result[0]
            courses_assigned = result[1]
            in_progress = result[2]
            course_comp = result[3]
            grade = result[4]
            return render_template('index.html', username=username, courses_assigned=courses_assigned, in_progress=in_progress, course_comp=course_comp, grade=grade, name=name)
        else:
            return "User data not found"
    else:
        return redirect(url_for('login'))
    
@app.route('/ide')
def compiler():
    return render_template('compiler.html')

@app.route('/modules')
def modules():
    return render_template('modules.html')

@app.route('/sim')
def sim():
    return render_template('simulation.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/simulation', methods=['GET', 'POST'])
def simulation():
    if request.method == 'POST':
        code = request.form['code']
        model_engine = "text-davinci-002" # Replace with desired OpenAI GPT-3 model
        prompt = f"Please explain the following Java code line-by-line:\n{code}"
        response = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )
        explanation = response.choices[0].text.strip()
        explanation_lines = explanation.split('\n')
        html_output = f"""
                <h2 style="text-align: center;">Explanation:</h2>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    {''.join(f'<div style="font-size: 16px; line-height: 1.4; margin-bottom: 10px; align-items: center;">{line.strip()}</div>' for line in explanation_lines)}
                </div>
            """

        return html_output
    else:
        return render_template('index.html')



@app.route('/', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM login_details WHERE email='{email}' AND password='{password}'")
        user = cursor.fetchone()
        if user:
            session['user'] = user[0]  # user_id
            return redirect('/home')
        else:
            return "Failed to login"
    return render_template('signin.html')
 
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        cursor = db.cursor()
        sql = "INSERT INTO login_details (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(sql, (username, email, password))
        db.commit()
        session['user'] = cursor.lastrowid
        return redirect('/')
    else:
        return render_template('signup.html')


@app.route('/profile')
def profile():
    user_id = session.get('user')
    if user_id:
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM user_data WHERE user_id={user_id}")
        user_data = cursor.fetchone()
        return render_template('profile.html', user_data=user_data)
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    if 'user' in session:
        session.pop('user')
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True, port=1111)
