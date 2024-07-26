document.addEventListener('DOMContentLoaded', () => {
    const guestList = {
        "Principal Sponsors": [
            "Bryan & Daisy Manongsong",
            "Mr & Mrs Basco",
            "Mr & Mrs Castillo",
            "Mr & Mrs Cafino",
            "Mr & Mrs Belango"
        ],
        "Best Man": ["Gelo Cafino"],
        "Maid of Honor": ["Myta Villamor"],
        "Grooms Men": [
            "John Michael Tungala",
            "Christian Bucad",
            "Tyrone De Asis",
            "Con Serrano",
            "Elias Tanate III",
            "Joshua Chavez",
            "Julius Paul Cabasa",
            "Lorezo Dipad",
            "Sheen Reyes",
            "Ian Lavapie"
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

fetch('/api/guests')
    .then(response => response.json())
    .then(data => {
        // Use `data` to populate the guest list
    });

    fetch('/api/companions')
    .then(response => response.json())
    .then(data => {
        // Use `data` to populate companion fields
    });
    fetch('/api/companions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            guest: 'Guest Name',
            companions: ['Companion 1', 'Companion 2']
        })
    }).then(response => response.text())
      .then(message => {
          alert(message);
      });
    