const allPara =document.querySelectorAll('p, h1, h2, h3, h4, h5');
for (let i = 0; i<allPara.length; i++) {
    allPara[i].textContent = allPara[i].textContent.replaceAll(/[A-Za-z]{6,}/g, 'chicken');
}