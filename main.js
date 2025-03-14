// Initializing supabase connecting the api key ....

// my Anon key and Api key
const SUPABASE_URL = "https://bxpbqjqhcfpqgvbjrjgp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cGJxanFoY2ZwcWd2YmpyamdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTYwMTQsImV4cCI6MjA1NzIzMjAxNH0.Yihh4xvIxY3lF6altKtlaokL1kj4j4qEFFzjxvzRn_g";

// my Anon key and Api key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const userForm = document.getElementById('user-form');

userForm.addEventListener ( "submit",  async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;


    // Input Data Into Supabase.,.,., 
    const { data, error } = await supabase
    .from("clients")
    .insert ([{name, email}]);

    if ( error ) {
        alert (" There is an Unexpected Error Adding User" + error.message );
    } else {
        alert ('User Added Sucessfully!')
        userForm.reset(); // clears the form and makes it reusable by another user
        fetchClients(); // Refresher the client's list....
    }
});

// Retrive or Get users from supabase database { table }and display them
async function fetchClients() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Clear the list before adding new items

    const { data, error } = await supabase.from("clients").select("*");

    if (error) {
        console.error("Error fetching users:", error);
        return;
    }

    data.forEach (user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

//  Load Users on Page Load
fetchClients();
