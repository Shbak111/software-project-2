export function login(){
        return{
            access_token : 'josidfwberb2i349q2hv31023k2@342034js',
            refresh_token : 'hw30402834-1kjsdfnpsdfielwer@#$',
        };
}

export function logout() {
    console.log('localStorage set logout!');
    window.localStorage.setItem('logout', Date.now());
  }