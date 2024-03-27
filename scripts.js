// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBUn7adoBBZl1_9YBhj0zDTgndxFf7tKSU",
    authDomain: "js-project-73cae.firebaseapp.com",
    projectId: "js-project-73cae"
});

// Get references to Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Reference to authentication forms
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

// Sign up form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signupEmail'].value;
    const password = signupForm['signupPassword'].value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            // User signed up successfully
            console.log('User signed up:', cred.user.uid);
            // Clear form
            signupForm.reset();
        })
        .catch(error => {
            // Handle errors
            console.error('Sign up error:', error);
        });
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;
    auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
            // User logged in successfully
            console.log('User logged in:', cred.user.uid);
            // Clear form
            loginForm.reset();
        })
        .catch(error => {
            // Handle errors
            console.error('Login error:', error);
        });
});


// Reference to recipe list container
const recipeList = document.getElementById('recipeList');
// Reference to search input and button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Function to display recipes
function displayRecipes(recipes) {
    recipeList.innerHTML = ''; // Clear previous recipes
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Function to search recipes
function searchRecipes(query) {
    db.collection('recipes')
        .where('title', '>=', query)
        .where('title', '<=', query + '\uf8ff') // \uf8ff is a placeholder to include all characters after the query
        .get()
        .then(snapshot => {
            const recipes = snapshot.docs.map(doc => doc.data());
            displayRecipes(recipes);
        })
        .catch(error => {
            console.error('Error searching recipes:', error);
        });
}

// Event listener for search button click
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        searchRecipes(query);
    }
});
