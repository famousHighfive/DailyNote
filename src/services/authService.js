import { ref } from "vue"

/*--------------------------------------------------------
VARIABLES
---------------------------------------------------------*/
export const users = ref([
    {email: 'test@test.com', password: '123'}
])

export const isAuth = ref(localStorage.getItem('auth') === 'true')
export const currentUser = ref(JSON.parse(localStorage.getItem('user')))


/*--------------------------------------------------------
LOGIN
---------------------------------------------------------*/
export function conneXion(mail, pwd){
    // verification des champs
    if(!mail.trim() || !pwd){
        return {success: false, message: 'Veuillez remplir les champs'}
    }

    // find dans le tableau de lutilisateur
    const foundUser = users.value.find(user => 
        user.email === mail.trim() && 
        user.password === pwd
    )
    
    if(foundUser){
        // utilisateur trouvé = connexion approuvé
        localStorage.setItem('auth', 'true')
        localStorage.setItem('user', JSON.stringify(foundUser))
        isAuth.value = true
        currentUser.value = foundUser
        return {success: true, user: foundUser}
    }else{
        return {success: false, message: 'Identifiants incorrects...'}
    }
}


/*--------------------------------------------------------
LOGOUT
---------------------------------------------------------*/
export const deconneXion = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    isAuth.value = false
    currentUser.value = null
}