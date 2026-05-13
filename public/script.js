document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const categoryFilter = document.getElementById('category-filter');
    let allTalks = [];

    async function fetchTalks() {
        try {
            const response = await fetch('/api/talks');
            allTalks = await response.json();
            populateFilter(allTalks);
            renderSchedule(allTalks);
        } catch (error) {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        }
    }

    function populateFilter(talks) {
        const categories = new Set();
        talks.forEach(talk => {
            talk.categories.forEach(cat => categories.add(cat));
        });

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }

    function formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
    }

    function renderSchedule(talks, filter = 'all') {
        scheduleContainer.innerHTML = '';
        
        let currentTime = 10 * 60; // 10:00 AM in minutes
        const transition = 10;
        const lunchDuration = 60;

        talks.forEach((talk, index) => {
            // Check for lunch break after the 3rd talk
            if (index === 3) {
                const lunchStart = currentTime;
                const lunchEnd = currentTime + lunchDuration;
                
                const lunchEl = document.createElement('div');
                lunchEl.className = 'schedule-item break';
                lunchEl.innerHTML = `
                    <span class="time">${formatTime(lunchStart)} - ${formatTime(lunchEnd)}</span>
                    <h2 class="title">Lunch Break</h2>
                    <p class="description">Time to recharge and network!</p>
                `;
                scheduleContainer.appendChild(lunchEl);
                currentTime += lunchDuration;
            }

            const startTime = currentTime;
            const endTime = currentTime + talk.duration;

            // Only show talk if it matches filter
            if (filter === 'all' || talk.categories.includes(filter)) {
                const talkEl = document.createElement('div');
                talkEl.className = 'schedule-item';
                talkEl.innerHTML = `
                    <span class="time">${formatTime(startTime)} - ${formatTime(endTime)}</span>
                    <h2 class="title">${talk.title}</h2>
                    <p class="speakers">Speakers: ${talk.speakers.join(', ')}</p>
                    <div class="categories">
                        ${talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                    <p class="description">${talk.description}</p>
                `;
                scheduleContainer.appendChild(talkEl);
            }

            // Update time for next talk (even if filtered out, to keep schedule timing consistent)
            currentTime = endTime + transition;
        });
    }

    categoryFilter.addEventListener('change', (e) => {
        renderSchedule(allTalks, e.target.value);
    });

    fetchTalks();
});
