import pyrebase

config = {
        'apiKey': "AIzaSyC-59MmXPJmeINB-JmLcBu4UW2oXxmlugE",
        'authDomain': "vlab-64d62.firebaseapp.com",
        'databaseURL': "https://vlab-64d62-default-rtdb.firebaseio.com",
        'projectId': "vlab-64d62",
        'storageBucket': "vlab-64d62.appspot.com",
        'messagingSenderId': "302815846155",
        'appId': "1:302815846155:web:1ab8b482462e03f613cc0e",
        'measurementId': "G-D32PPQ33WM"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

email = 'test2@gmail.com'
password = '123456'

user = auth.create_user_with_email_and_password(email, password)

user = auth.sign_in_with_email_and_password(email, password)

# info = auth.get_account_info(user['idToken'])
# print(info)

auth.send_email_verification(user['idToken'])

auth.send_password_reset_email(email)