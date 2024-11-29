const API_KEY = "758fc8ae73894eea9abf6698ac0eef24";

const blog_Container = document.getElementById('blog-container');

const inputField = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", async()=>{
    const query = inputField.value.trim();
    if(query !== ""){
try{
    const articles = await fetchnewQuery(query);
    displayBlogs(articles);
} catch(error){
console.log("error occur by search Query" , error)
}
    }
});

async function fetchnewQuery (query) {

    try{ const API_URL = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${API_KEY}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.articles
       } catch (error){
        console.error("Error by searching random news ", error);
       }
}


const  readNews = async () =>{
   try{ const API_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.articles
   } catch (error){
    console.error("Error by searching random news ", error);
   }

}

(async () =>{
    try{
        const articles = await readNews();
        displayBlogs(articles);
    } catch (error){
        console.error("Error by searching random news ", error);
       }
})();

function displayBlogs (articles) {
    blog_Container.innerHTML = "";
    articles.forEach((article)=>{
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "...":article.title;
    title.textContent = truncatedTitle;
    
    const description = document.createElement ("p");
    description.textContent = article.description;
    
    blogCard.appendChild(img)
    blogCard.appendChild(title) 
    blogCard.appendChild(description);
    
    blogCard.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
        });
    
        blog_Container.appendChild(blogCard);
    
    });
    }
