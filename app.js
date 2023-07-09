const API_KEY="c054c68c27eb4de39203fb438361c3a9";
const URL="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchnews("India"))

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data=await res.json();
    console.log(data.articles);
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container')
    const newsTemplate=document.getElementById('template-news-card')

    cardsContainer.innerHTML="";
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone=newsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone,article);
    })


    function fillDataInCard(cardClone,article){
        const newsImg=cardClone.querySelector('#news-img')
        const newsTitle=cardClone.querySelector('#news-title')
        const newsSource=cardClone.querySelector('#news-source')
        const newsDesc=cardClone.querySelector('#news-desc')

        newsImg.src=article.urlToImage;
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;


        const date=new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"

        }
            
        )

        newsSource.innerHTML=`${article.source.name}.${date}`;

        cardClone.firstElementChild.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })
    }

}

function onNavItemClick(id){
    fetchnews(id);
    
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-bar');

searchButton.addEventListener("click", ()=>{
    const query=searchText.value;
    if(!query) return;

    fetchnews(query);

})