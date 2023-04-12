(async()=>{
    const res=await fetch("https://raw.githubusercontent.com/ishaq-bhojani/JS-Crash-Course/main/javascript-09/recipes.json")
    const recipeObj= await res.json();
    
    let btnSearch=document.getElementById("searchBtn");
    function displaySearchRes(results){
        let lists=document.getElementById("recipe-list");
        lists.innerHTML="";
        results.forEach((res) => {
            
            const li=document.createElement("li");
            let html=`
            <div class="title">${res.title}</div>
            <div class="description">${res.description}</div>`
             li.innerHTML=html;           
            lists.appendChild(li);    
            
            li.addEventListener("click",()=>{
                displayDetails(res);
            })
            
            
        });

        
    }
    function displayDetails(res){
        const details=document.getElementById("recipeDetailsContainer");
        details.innerHTML="";
        const heading=document.createElement("h2");
        heading.innerText=res.title;
        details.appendChild(heading);
        details.innerHTML+=`
        <ul>
        ${res.ingredients.map((ingredient)=>{
            return "<li>"+ingredient+"</li>";
        }).join("")}
        </ul>
        <h3>INSTRUCTIONS</h3>
        <ul>
        ${res.instructions.map((ins)=>{
            return "<li>"+ins+"</li>";
        }).join("")}
        </ul>
        `

    }
    btnSearch.addEventListener("click",async()=>{
        let query=document.getElementById("searchInput").value;
        const results=recipeObj.filter((recipe)=>{
            return (recipe.title.toLowerCase().includes(query)||recipe.ingredients.join(" ").toLowerCase().includes(query));
        });

        await displaySearchRes(results);
    })
})();