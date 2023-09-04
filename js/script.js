const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(response => response.json())
        .then(data => showCate(data))
}

const loadAllData = (id = 1000) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(response => response.json())
        .then(data => showAllData(data))
}

function showCate(categoriesData) {
    const categories = categoriesData.data;
    const categoryBtnContainer = document.getElementById('catergories-btn');
    for (category of categories) {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('btn', 'category-btn');
        categoryBtn.innerText = category.category;
        categoryBtn.setAttribute('category-id', category.category_id)
        categoryBtnContainer.appendChild(categoryBtn);

        categoryBtn.addEventListener('click', () => {
            const btnCategoryId = categoryBtn.getAttribute('category-id');
            loadAllData(btnCategoryId)
        })
        
    }
    const buttons = document.querySelectorAll(`#catergories-btn .btn`)
    buttons.forEach(button => {
        const buttonText = button.innerText;
        if (buttonText === 'ALL') {
            button.classList.add('category-btn-active');
        }
        button.addEventListener('click', () => {
            buttons.forEach(button => {
                button.classList.remove('category-btn-active');
            });
            button.classList.add('category-btn-active');

            

        })
    })
}


function showAllData(data) {
    const allData = data.data;

    const cardContainer = document.getElementById('all-card-container');
    const errorBox = document.getElementById('error-box')
    cardContainer.textContent = "";
    for (cardData of allData) {
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card card-compact`;
        cardDiv.innerHTML = `
            <figure class="h-52 lg:h-60 lg:w-96"><img class="w-full h-full" src="${cardData.thumbnail}"/></figure>
            <div class="card-body flex justify-start flex-row">
                <div class="avatar">
                    <div class="w-20 rounded-full">
                        <img class="w-full" src="${cardData.authors[0].profile_picture}" />
                    </div>
                </div>
                <div class="card-texts">
                    <h2 class="card-title">${cardData.title}</h2>
                    <div class="author-box flex flex-row gap-2">
                        <h4 class="author-name">${cardData.authors[0].profile_name}</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" class="hidden blue-verified-badge" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#228BE6;"><g fill="#228be6" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M45.103,24.995l3.195,-6.245l-5.892,-3.807l-0.354,-7.006l-7.006,-0.35l-3.81,-5.89l-6.242,3.2l-6.245,-3.196l-3.806,5.893l-7.005,0.354l-0.352,7.007l-5.89,3.81l3.2,6.242l-3.194,6.243l5.892,3.807l0.354,7.006l7.006,0.35l3.81,5.891l6.242,-3.2l6.245,3.195l3.806,-5.893l7.005,-0.354l0.352,-7.006l5.89,-3.81zM22.24,32.562l-6.82,-6.819l2.121,-2.121l4.732,4.731l10.202,-9.888l2.088,2.154z"></path></g></g>
                        </svg>
                    </div>
                    <h4 class="post-views">${cardData.others.views}</h4>
                </div>
            </div>
        `

        const authorVerification = cardData.authors[0].verified;
        if(authorVerification === true){
            const verifiedBadge = cardDiv.querySelector('.blue-verified-badge');
                verifiedBadge?.classList.remove('hidden')
            }
            
            cardContainer.appendChild(cardDiv);
        }
        if(cardContainer.textContent !== ""){
            errorBox.classList.add('hidden');
        }else{
            errorBox.classList.remove('hidden');
        }
}


loadCategories();
loadAllData();

