Balanced.LoginController = Balanced.ObjectController.extend({
    email: null,
    password: null,
    loginError: false,
    loginResponse: '',
    showLoading: false,

    init: function () {
        var self = this;
        Balanced.Auth.on('signInError', function () {
            self.set('loginError', true);
            self.set('showLoading', false);
            var response = Balanced.Auth.get('jqxhr');

            if (response.status === 401) {
                self.set('loginResponse', 'Invalid e-mail address or password.');
                return;
            }

            if (typeof response.responseText !== "undefined") {
                var responseText = JSON.parse(response.responseText);
                var error;
                if (typeof responseText.email_address !== 'undefined') {
                    error = responseText.email_address[0].replace('This', 'Email');
                } else if (typeof responseText.password !== 'undefined') {
                    error = responseText.password[0].replace('This', 'Password');
                }

                if (error) {
                    self.set('loginResponse', error);
                }
            }
        });
        Balanced.Auth.on('signInSuccess', function () {
            self.set('loginError', false);
        });
        Balanced.Auth.on('signOutSuccess', function () {
            self.set('showLoading', false);
            self.set('password', null);
        });
    },

    signIn: function () {
        this.set('showLoading', true);
        Balanced.Auth.forgetLogin();
        Balanced.Auth.signIn({
            data: {
                email_address: this.get('email'),
                password: this.get('password')
            }
        });
    }
});