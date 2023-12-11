document.addEventListener('DOMContentLoaded', () => {
    //Load entries from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            //Reference the div with id summary-details.
            const summaryDetails = document.getElementById('summary-details');
            //create a totalScore variable and initiate it to 0
            let totalScore = 0;

            //For each entry in data.json
            data.forEach(element => {
                //// Get the category data element
                const category = element.category.toLowerCase();
                //console.log(category)
                //// create a div1 & add the summary-card-row {category}-bg-color classes
                const div1 = document.createElement('div');
                div1.className = `summary-card-row ${category}-bg-color`;
                //console.log(div1.className)
                //// Create another div2 and add summary-card-cell and {category}-color classes
                const div2 = document.createElement('div');
                div2.className = `summary-card-cell ${category}-color`;
                //console.log(div2.className);
                //// Add image data element to div2
                div2.innerHTML = `
                <img src="${element.icon}" alt="${category} icon"> &nbsp;&nbsp;${element.category}
                `;
                //// Add div2 to div1
                div1.appendChild(div2);
                //// Create another div3 and add summary-card-cell class
                const div3 = document.createElement('div');
                div3.className = `summary-card-cell`;
                //// Add score data element to div3 in the form <b>80</b>&nbsp; / 100
                div3.innerHTML = `<b>${element.score}</b>&nbsp; / 100`;
                //// Update totalScore with score data element
                totalScore += parseInt(`${element.score}`);
                //console.log(totalScore)
                //// Add div3 to div1
                div1.appendChild(div3);
                //// Add div1 to summary-details div
                summaryDetails.appendChild(div1)
            });
            //Reference the h1 with id totalScore
            const tScore = document.getElementById('totalScore');
            //update it with totalScore variable
            const score = Math.round(totalScore / data.length);
            tScore.innerHTML = score;

            //Reference the p element with id result-description
            const resultDesc = document.getElementById('result-description');

            //update it with 'You scored higher than ${score}% of the people who have taken these tests'.
            resultDesc.innerHTML = `You scored higher than ${score}% of the people who have taken these tests.`;
        })
        .catch(error => console.log('Data loading error:', error));
})