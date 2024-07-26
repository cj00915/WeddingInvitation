document.addEventListener('DOMContentLoaded', () => {
    const guestList = {
        "Principal Sponsors": [
            "Principal Sponsor 1", "Principal Sponsor 2", "Principal Sponsor 3",
            "Principal Sponsor 4", "Principal Sponsor 5", "Principal Sponsor 6",
            "Principal Sponsor 7", "Principal Sponsor 8", "Principal Sponsor 9", "Principal Sponsor 10"
        ],
        "Best Man": ["Best Man"],
        "Maid of Honor": ["Maid of Honor"],
        "Grooms Men": [
            "Grooms Man 1", "Grooms Man 2", "Grooms Man 3", "Grooms Man 4", "Grooms Man 5",
            "Grooms Man 6", "Grooms Man 7", "Grooms Man 8", "Grooms Man 9", "Grooms Man 10"
        ],
        "Brides Maid": [
            "Brides Maid 1", "Brides Maid 2", "Brides Maid 3", "Brides Maid 4", "Brides Maid 5",
            "Brides Maid 6", "Brides Maid 7", "Brides Maid 8", "Brides Maid 9", "Brides Maid 10"
        ]
    };

    const companionLimits = {
        "Principal Sponsors": 3,
        "Best Man": 3,
        "Maid of Honor": 3,
        "Grooms Men": 1,
        "Brides Maid": 1
    };

    const companionsData = JSON.parse(localStorage.getItem('companionsData')) || {};

    function showGuestList() {
        Object.entries(guestList).forEach(([category, guests]) => {
            const ul = document.getElementById(category.toLowerCase().replace(/ /g, '-'));
            guests.forEach((guest) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `guest.html?guest=${encodeURIComponent(guest)}&category=${encodeURIComponent(category)}`;
                a.textContent = guest;
                li.appendChild(a);
                ul.appendChild(li);
            });
        });
    }

    function showGuestPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const guest = urlParams.get('guest');
        const category = urlParams.get('category');
        if (!guest || !category) return;

        document.getElementById('guest-name').textContent = guest;
        const companionCount = companionLimits[category];
        const form = document.getElementById('companion-form');

        for (let i = 1; i <= companionCount; i++) {
            const div = document.createElement('div');
            div.className = 'companion';

            const label = document.createElement('label');
            label.setAttribute('for', `companion${i}`);
            label.textContent = `Companion ${i}:`;

            const input = document.createElement('input');
            input.type = 'text';
            input.id = `companion${i}`;
            input.name = `companion${i}`;
            input.value = companionsData[guest]?.[i - 1] || '';
            input.readOnly = true;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            editButton.onclick = (event) => {
                event.preventDefault();
                if (input.readOnly) {
                    input.readOnly = false;
                    editButton.textContent = 'Save';
                } else {
                    input.readOnly = true;
                    editButton.textContent = 'Edit';
                    saveCompanions(guest);
                    alert('Companion details updated!');
                }
            };

            div.appendChild(label);
            div.appendChild(input);
            div.appendChild(editButton);
            form.appendChild(div);
        }
    }

    function saveCompanions(guest) {
        const companions = [];
        document.querySelectorAll(`input[id^='companion']`).forEach((input) => {
            companions.push(input.value);
        });
        companionsData[guest] = companions;
        localStorage.setItem('companionsData', JSON.stringify(companionsData));
    }

    if (document.getElementById('principal-sponsors')) {
        showGuestList();
    } else if (document.getElementById('companion-form')) {
        showGuestPage();
    }
});
