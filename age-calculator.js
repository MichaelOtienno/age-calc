
document.querySelector('#submit').addEventListener('click', (e) => {
    const answer = document.querySelector('.answer');
    const display = document.getElementById('agebox');
    const name = document.getElementById('name').value;
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    if (name.trim() === '' || isNaN(day) || isNaN(month) || isNaN(year)) {
        alert('Fill all inputs');
        return;
    }

    if (day > 31 || day < 1 || month > 12 || month < 1) {
        alert('Invalid date');
        return;
    }

    if (month === 2) {
        if (year % 4 !== 0 && day > 28) {
            alert('February has less 28 days only');
            return;
        }
        if (year % 4 === 0 && day > 29) {
            alert('February has 29 days only');
            return;
        }
    }

    const dob = new Date(year, month - 1, day); 

    const currentDate = new Date();

    if (dob > currentDate) {
        alert('Date of birth cannot be in the future');
        return;
    }

    display.innerHTML = '';
    answer.style.display = 'block';

    function age(dob, currentDate) {
        const diff = currentDate - dob;
        const ageDate = new Date(diff);

        const years = ageDate.getUTCFullYear() - 1970;
        const months = ageDate.getUTCMonth();
        const days = ageDate.getUTCDate() - 1;

        return { years, months, days };
    }

    years = age(dob, currentDate);

    const Name = document.createElement('p');
    const ageText = `You are ${years.years} years, ${years.months} months, and ${years.days} days old.`;
    Name.textContent = name + ',\n';
    display.appendChild(Name);

    function countUp(duration, start, end, element) {
        let current = start;
        const increment = (end - start) / duration;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = `You are ${Math.floor(current)} years, ${years.months} months, and ${years.days} days old.`;
            if (current >= end) {
                clearInterval(timer);
            }
        }, 1000);
    }

    const ageNumber = document.createElement('p');
    ageNumber.textContent = `You are 0 years, ${years.months} months, and ${years.days} days old.`;
    display.appendChild(ageNumber);

    countUp(4, 0, years.years, ageNumber);
    setTimeout(() => {
        display.innerText = '';
        answer.style.display = 'none'
    }, 10000);

    document.getElementById("ageform").reset();
});


