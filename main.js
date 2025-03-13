// Initializing supabase connecting the api key ...
import { createClient } from '@supabase/supabase-js'

// my Anon key and Api key


const supabaseUrl = 'https://bxpbqjqhcfpqgvbjrjgp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const userForm = document.getElementById('user-form');

userForm.addEventListener ( "submit",  async function (e) {
    
    e.preventDefault();

const name = document.getElementById('name').value;
const email = document.getElementById('email').value;


    // Input Data Into Supabase.,.,., 
    const { data, error } = await supabase
    .from("users")
    .insert ([{name, email}]);

    if ( error ) {
        alert (" There is an Unexpected Error Adding User" + error.message);
    } else {
        alert ('User Added Sucessfully!')
        userForm.reset(); // clears the form and makes it reusable by another user
        fetchUsers(); // Refresher the user's list....
    }
});

// Retive or Get users from supabase and display them
async function fetchUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Clear the list before adding new items

    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.error("Error fetching users:", error);
        return;
    }

    data.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

//  Load Users on Page Load
// fetchUsers();
