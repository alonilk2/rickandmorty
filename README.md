Tikal - Rick&Morty's home assignment

### Part 1
In order to get the list of all characters while making as few API requests as possible, I have read the documentation thoroughly,
and I found that calling the main `/character` endpoint, which is the documented way to 'get all characters',
results in a response object which includes information about the response, such as total number of characters, as well as number of pages, which was standing on 42.

As it's pretty inefficient to make 42 requests just to get all characters data, I decided to look for an alternative way.
I found that by adding an array of characters ids as a parameter to '/character' endpoint, the server returns a full list of characters without pagination.

So my way of fetching the data is to make a GET request to '/character' without parameters to get the total count of characters,
and then I make a GET request with [1..#characters] ids array as parameter. 

After that the list of characters is being filtered by `character.origin.name="Earth C-137"`,
and the filtered character list is sorted by number of episodes.
Then the most unpopular character is placed in index 0.

### Part 2
As there are many characters called the same names written in the assignment, I added the character id under each bar.

