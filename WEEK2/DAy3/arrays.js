 fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => analyzeData(data.users))
        .catch(error => console.error("Error fetching data:", error));

function analyzeData(users) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Filter Active Users
    const activeUsers = users.filter(user => 
        user.posts.some(post => new Date(post.timestamp) >= oneWeekAgo)
    );

    // Extract Popular Posts
    const popularPosts = activeUsers.flatMap(user => 
        user.posts.filter(post => post.likes >= 10)
    );

    // Calculate Average Likes per Active User
    const totalLikes = popularPosts.reduce((sum, post) => sum + post.likes, 0);
    const averageLikes = activeUsers.length > 0 ? (totalLikes / activeUsers.length).toFixed(2) : 0;

    // Update the UI
    document.getElementById("activeUsersCount").textContent = activeUsers.length;
    document.getElementById("totalPopularPosts").textContent = popularPosts.length;
    document.getElementById("averageLikesPerUser").textContent = averageLikes;
}
