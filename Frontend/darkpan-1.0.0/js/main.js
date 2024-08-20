(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    /* Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                label: "USA",
                data: [15, 30, 55, 65, 60, 80, 95],
                backgroundColor: "rgba(235, 22, 22, .7)"
            },
            {
                label: "UK",
                data: [8, 35, 40, 60, 70, 55, 75],
                backgroundColor: "rgba(235, 22, 22, .5)"
            },
            {
                label: "AU",
                data: [12, 25, 45, 55, 65, 70, 60],
                backgroundColor: "rgba(235, 22, 22, .3)"
            }
            ]
        },
        options: {
            responsive: true
        }
    });


    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                label: "Salse",
                data: [15, 30, 55, 45, 70, 65, 85],
                backgroundColor: "rgba(235, 22, 22, .7)",
                fill: true
            },
            {
                label: "Revenue",
                data: [99, 135, 170, 130, 190, 180, 270],
                backgroundColor: "rgba(235, 22, 22, .5)",
                fill: true
            }
            ]
        },
        options: {
            responsive: true
        }
    });



    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });
*/
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById('searchInput');
        const tableBody = document.getElementById('tableBody');
        const rows = tableBody.getElementsByTagName('tr');

        searchInput.addEventListener('keyup', function () {
            const filter = searchInput.value.toLowerCase();

            for (let i = 0; i < rows.length; i++) {
                let match = false;
                const cells = rows[i].getElementsByTagName('td');
                for (let j = 0; j < cells.length; j++) {
                    if (cells[j]) {
                        if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                            match = true;
                            break;
                        }
                    }
                }
                rows[i].style.display = match ? '' : 'none';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const tableBody = document.getElementById('tableBody');
        const pageSize = 5; // Customize as needed
        let currentPage = 1;
    
        async function loadGames(pageNumber = 1) {
            try {
                const response = await fetch(`/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                const data = await response.json();
    
                tableBody.innerHTML = ''; // Clear previous rows
    
                data.Data.forEach(game => {
                    const row = `
                        <tr>
                            <td>${game.name}</td>
                            <td>${game.genreName}</td>
                            <td>${game.price}$</td>
                            <td>${game.releaseDate}</td>
                            <td>
                                <a class="btn btn-sm btn-primary" href="EditGame.html">edit</a>
                                <a class="btn btn-sm btn-primary" href="">delete</a>
                            </td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
    
                // Optionally handle pagination buttons here
            } catch (error) {
                console.error('Error loading games:', error);
            }
        }

//calls the CreatGame fucntion

 
// Function to delete a game
function deleteGame(id) {
    // Find the index of the game with the given id in the games array
    const index = games.findIndex((game) => game.id === id);

    // If the game is found, remove it from the array
    if (index !== -1) {
        games.splice(index, 1);

        // Remove the corresponding row from the table body
        const tableBody = document.getElementById('tableBody');
        const rows = tableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.dataset.gameId === id.toString()) {
                row.remove();
                break;
            }
        }
    } else {
        console.error('Game not found');
    }
}


// Function to create a new game
function createGame() {
    // Get the form data
    const gameName = document.getElementById('gameName').value;
    const gamePrice = document.getElementById('gamePrice').value;
    const gameDate = document.getElementById('gameDate').value;
    const gameGenre = document.getElementById('gameGenre').value;

    // Create a new game object
    const newGame = {
        id: games.length + 1,
        name: gameName,
        price: gamePrice,
        releaseDate: gameDate,
        genre: gameGenre
    };

    // Add the new game to the games array
    games.push(newGame);

    // Update the table to reflect the new game
    const tableBody = document.getElementById('tableBody');
if (tableBody) {
  // Update the table to reflect the new game
  const row = document.createElement('tr');
  row.dataset.gameId = newGame.id;
  row.innerHTML = `
    <td>${newGame.name}</td>
    <td>${newGame.genre}</td>
    <td>${newGame.price}</td>
    <td>${newGame.releaseDate}</td>
    <td class="action">
      <a class="btn btn-sm btn-primary" href="EditGame.html">edit</a>
      <a class="btn btn-sm btn-primary delete-button" href="">delete</a>
    </td>
  `;
  tableBody.appendChild(row);
} else {
  console.log("Table element not found");
}

    const saveChangesButton = document.getElementById('saveChangesCreateGameBtn');
    saveChangesButton.addEventListener('click', createGame);

    // Add an event listener to the delete button
    const deleteButton = row.querySelector('.delete-button');
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        deleteGame(newGame.id);
    });
}
// Function to generate the table
function generateTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach((game) => {
        const row = document.createElement('tr');
        row.dataset.gameId = game.id; // Add the game id to the row
        row.innerHTML = `
            <td>${game.name}</td>
            <td>${game.genre}</td>
            <td>${game.price}</td>
            <td>${game.releaseDate}</td>
            <td class="action">
                <a class="btn btn-sm btn-primary" href="EditGame.html">edit</a>
                <a class="btn btn-sm btn-primary delete-button" href="">delete</a>
            </td>
        `;
        tableBody.appendChild(row);

        // Add an event listener to the delete button
        const deleteButton = row.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            deleteGame(game.id);
        });
    });
}



function loadGames() {
    const games = [
        { id: 1, name: 'Game 1', genre: 'Action', price: 19.99, releaseDate: '2020-01-01' },
        { id: 2, name: 'Game 2', genre: 'Adventure', price: 29.99, releaseDate: '2020-02-01' },
        // Add more predefined games if needed
    ];

    // Retrieve games from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('game_')) {
            const game = JSON.parse(localStorage.getItem(key));
            games.push(game);
        }
    }

    // Generate the table with the combined list of games
    generateTable(games);
}

    
        // Load initial page
        //loadGames(currentPage);
          // Load games when the page loads
          window.onload = loadGames;

        
    
        // Example for handling pagination buttons\
        /*
        document.getElementById('nextPageButton').addEventListener('click', () => {
            currentPage++;
            loadGames(currentPage);
        });
    
        document.getElementById('prevPageButton').addEventListener('click', () => {
            if (currentPage > 1) currentPage--;
            loadGames(currentPage);
        });
        */
    });

    document.getElementById('searchInput').addEventListener('input', async function () {
        const searchValue = this.value;
    
        try {
            const response = await fetch(`/search?search=${searchValue}`);
            const data = await response.json();
    
            if (response.status === 200) {
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = '';
    
                data.Data.forEach(game => {
                    const row = `
                        <tr>
                            <td>${game.name}</td>
                            <td>${game.genreName}</td>
                            <td>${game.price}$</td>
                            <td>${game.releaseDate}</td>
                            <td>
                                <a class="btn btn-sm btn-primary" href="EditGame.html">edit</a>
                                <a class="btn btn-sm btn-primary" href="">delete</a>
                            </td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            } else {
                console.error(data.Message);  // Handle 'not found' message
            }
        } catch (error) {
            console.error('Error performing search:', error);
        }
    });

    document.getElementById('searchInput').addEventListener('input', async function () {
        const searchTerm = this.value;
    
        if (searchTerm.length === 0) return;
    
        try {
            const response = await fetch(`/autocomplete?term=${searchTerm}`);
            const data = await response.json();
    
            const suggestionList = document.getElementById('suggestionList');
            suggestionList.innerHTML = ''; // Clear previous suggestions
    
            data.Suggestions.forEach(suggestion => {
                const listItem = document.createElement('li');
                listItem.textContent = suggestion;
                suggestionList.appendChild(listItem);
    
                // Optional: Add click event for selecting the suggestion
                listItem.addEventListener('click', function () {
                    document.getElementById('searchInput').value = suggestion;
                    suggestionList.innerHTML = ''; // Clear suggestions after selecting
                });
            });
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    });
    



})(jQuery);

