document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarNav = document.getElementById('sidebar-nav');
    const navToggle = document.getElementById('nav-toggle');

    let appData = {}; // Holds all user data

    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

    // --- Data Handling ---
    function loadData() {
        const savedData = localStorage.getItem('personalPlanData');
        if (savedData) {
            try {
                appData = JSON.parse(savedData);
                console.log('Data loaded from localStorage');
            } catch (e) {
                console.error('Error parsing saved data:', e);
                appData = {}; // Reset if data is corrupt
                localStorage.removeItem('personalPlanData'); // Clear corrupt data
            }
        } else {
            // Initialize default structure if no data saved
            appData = {
                week1: {}, week2: {}, week3: { timeLog: {} },
                week4: {}, week5: {}, week6: {},
                reflections: {} // Store reflections separately
            };
            console.log('No saved data found, initialized default structure.');
        }
        // Ensure all expected keys exist (useful if app updates)
         ensureDataStructure();
    }

    function saveData() {
        try {
            localStorage.setItem('personalPlanData', JSON.stringify(appData));
            console.log('Data saved to localStorage');
        } catch (e) {
            console.error('Error saving data to localStorage:', e);
            // Maybe notify user if storage is full?
        }
    }

     // Helper to make sure nested objects exist before accessing them
    function ensureDataStructure() {
        const weeks = ['week1', 'week2', 'week3', 'week4', 'week5', 'week6'];
        weeks.forEach(week => {
            if (!appData[week]) appData[week] = {};
        });
        if (!appData.week3.timeLog) appData.week3.timeLog = {};
        if (!appData.reflections) appData.reflections = {};
        // Add checks for other specific nested structures as needed
    }

    // --- Content Loading ---
    function loadSection(sectionId) {
        console.log(`Loading section: ${sectionId}`);
        mainContent.innerHTML = ''; // Clear previous content
        setActiveNavLink(sectionId);
        closeNav(); // Close nav on mobile after selection

        switch (sectionId) {
            case 'intro':
                renderIntro();
                break;
            case 'week1':
                renderWeek1();
                break;
            case 'week2':
                 renderWeek2();
                 break;
            case 'week3':
                 renderWeek3();
                 break;
            case 'week4':
                 renderWeek4();
                 break;
            case 'week5':
                 renderWeek5();
                 break;
            case 'week6':
                 renderWeek6();
                 break;
            case 'myplan':
                renderMyPlan();
                break;
            default:
                renderIntro(); // Default to intro
        }
        window.scrollTo(0, 0); // Scroll to top of new content
    }

    // --- Rendering Functions (Placeholders - We'll fill these next) ---
    function renderIntro() {
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Welcome to Your Personal Plan Journey</h2>
                <p>This six-week curriculum provides a structured process designed to empower you, as a follower of Christ, to live a more focused, intentional, and meaningful life aligned with His purposes...</p>
                <!-- Add more content from Page 1 & 2 Purpose/Goal/Requirements -->
                <h3>Process Overview:</h3>
                <ul>
                    <li>Personal Assessment</li>
                    <li>Active Documentation</li>
                    <li>Collaborative Refinement</li>
                    <li>Strategic Planning</li>
                    <li>Integration of Disciplines</li>
                    <li>Monitoring & Maintenance</li>
                </ul>
                 <h3>Requirements:</h3>
                 <ul>
                    <li>A Foundational Desire</li>
                    <li>Full Engagement</li>
                    <li>Honest Self-Evaluation</li>
                    <li>Openness to Sharing</li>
                    <li>Diligent Documentation</li>
                    <li>Commitment to Completion</li>
                 </ul>
            </div>`;
    }

    function renderWeek1() {
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 1: Defining Who and What is Important</h2>
                <h3>Focus:</h3>
                <p>Deeply exploring and articulating your core values, most significant relationships, and fundamental life principles. Identifying the non-negotiables.</p>

                <h3>Activities:</h3>
                <ol>
                    <li><strong>Brainstorm & Reflect:</strong> Set aside dedicated quiet time. Consider: WHAT are your core values, essential life areas, guiding principles? WHO are the key people and relationships?</li>
                    <li><strong>Identify the Primary:</strong> Determine which 'whats' and 'whos' rise above all others as foundational priorities.</li>
                    <li><strong>Document:</strong> Fill out the fields below, explaining <em>why</em> these are paramount.</li>
                </ol>

                <label for="w1-values">Core Values, Essential Life Areas, Guiding Principles (What?):</label>
                <textarea id="w1-values" data-week="week1" data-field="coreValues">${appData.week1?.coreValues || ''}</textarea>

                <label for="w1-people">Key People & Relationships (Who?):</label>
                <textarea id="w1-people" data-week="week1" data-field="keyPeople">${appData.week1?.keyPeople || ''}</textarea>

                <label for="w1-why">Why are these primary 'whats' and 'whos' paramount?</label>
                <textarea id="w1-why" data-week="week1" data-field="primaryWhy">${appData.week1?.primaryWhy || ''}</textarea>

                <h3>Reflection Prompt:</h3>
                <p>What feelings emerged distinguishing important <em>things</em> vs. important <em>people</em>? Was it hard to narrow down what and who are most important?</p>
                <label for="w1-reflection">Your Reflection:</label>
                <textarea id="w1-reflection" data-reflection="week1">${appData.reflections?.week1 || ''}</textarea>

                <h3>Contemplate Before Next Week:</h3>
                <p>Begin thinking more deeply about <em>why</em> each primary priority is so crucial for you. Start to loosely imagine what your life might look like if you were fully living in alignment with these, preparing for next week's refinement and envisioning exercises.</p>
            </div>`;
        addSaveListeners('week1'); // Add listeners after rendering
    }

    // --- Add placeholders for renderWeek2, 3, 4, 5, 6, and renderMyPlan ---
    function renderWeek2() {
        // Retrieve relevant Week 1 data to display for context, if needed
        const week1Values = appData.week1?.coreValues || 'Not yet defined.';
        const week1People = appData.week1?.keyPeople || 'Not yet defined.';
        const week1Why = appData.week1?.primaryWhy || 'Not yet defined.';
    
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 2: Identifying Your Priorities (Solidifying & Envisioning)</h2>
                <h3>Focus:</h3>
                <p>Reviewing, confirming, and deepening understanding of Week 1 priorities. Envisioning what living these priorities looks like.</p>
    
                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Review & Refine:</strong> Re-read your entries from Week 1 below. Go back to the <a href="#week1" class="nav-link" data-section="week1">Week 1 section</a> to adjust if needed.
                        <div style="background-color: #f9f9f9; border-left: 3px solid var(--primary-color); padding: 10px; margin-top: 10px; font-size: 0.9em;">
                            <p><strong>From Week 1 - Values/Principles (What):</strong><br>${week1Values.replace(/\n/g, '<br>')}</p>
                            <p><strong>From Week 1 - Key People (Who):</strong><br>${week1People.replace(/\n/g, '<br>')}</p>
                            <p><strong>From Week 1 - Why Paramount:</strong><br>${week1Why.replace(/\n/g, '<br>')}</p>
                        </div>
                    </li>
                    <li>
                        <strong>Articulate the 'Why':</strong> For each primary priority identified in Week 1, expand on <em>why</em> it's truly crucial. Deepen your conviction.
                        <label for="w2-why-crucial" style="margin-top: 10px; display: block;">Why are these priorities crucial?</label>
                        <textarea id="w2-why-crucial" data-week="week2" data-field="priorityWhyCrucial">${appData.week2?.priorityWhyCrucial || ''}</textarea>
                    </li>
                    <li>
                        <strong>Envision the Ideal:</strong> Brainstorm: What would it <em>look like</em> to fully live these priorities? What specific activities would you be doing? How would you <em>feel</em>? (Capture detailed notes).
                        <label for="w2-ideal-vision" style="margin-top: 10px; display: block;">Your Ideal Vision (Activities, Feelings):</label>
                        <textarea id="w2-ideal-vision" data-week="week2" data-field="idealVision">${appData.week2?.idealVision || ''}</textarea>
                    </li>
                </ol>
    
                <h3>Reflection Prompt:</h3>
                <p>How did solidifying the 'why' strengthen conviction? Did envisioning the 'ideal state' and key priorities bring clarity?</p>
                <label for="w2-reflection">Your Reflection:</label>
                <textarea id="w2-reflection" data-reflection="week2">${appData.reflections?.week2 || ''}</textarea>
    
                <h3>Contemplate Before Next Week:</h3>
                <p>With your refined priorities and vision now clearer, prepare yourself to face your <em>current</em> reality without judgment. Decide which method you'll use for detailed time tracking next week (app, notebook, spreadsheet). Mentally commit to the process of honest observation.</p>
            </div>`;
    
        // Add event listeners for the new textareas to save data on blur
        addSaveListeners('week2');
    
        // Add event listener for the internal nav link (needed because we replace innerHTML)
         const internalNavLink = mainContent.querySelector('.nav-link[data-section="week1"]');
         if (internalNavLink) {
             internalNavLink.addEventListener('click', handleNavClick);
         }
    }
    function renderWeek3() { mainContent.innerHTML = `<div class="content-section"><h2>Week 3 Coming Soon...</h2></div>`; }
    function renderWeek4() { mainContent.innerHTML = `<div class="content-section"><h2>Week 4 Coming Soon...</h2></div>`; }
    function renderWeek5() { mainContent.innerHTML = `<div class="content-section"><h2>Week 5 Coming Soon...</h2></div>`; }
    function renderWeek6() { mainContent.innerHTML = `<div class="content-section"><h2>Week 6 Coming Soon...</h2></div>`; }
    function renderMyPlan() { mainContent.innerHTML = `<div class="content-section"><h2>My Personal Plan (Summary) Coming Soon...</h2></div>`; }


    // --- Event Handling ---
    function handleNavClick(event) {
        event.preventDefault(); // Prevent default anchor link behavior
        const link = event.target.closest('.nav-link');
        if (link) {
            const sectionId = link.dataset.section;
            if (sectionId) {
                // Update URL hash for basic history/bookmarking
                window.location.hash = sectionId;
                 // No need to call loadSection here if we use hashchange listener
            }
        }
    }

    // Listen for hash changes to load sections
    function handleHashChange() {
        const sectionId = window.location.hash.substring(1) || 'intro'; // Get section from hash or default to intro
        loadSection(sectionId);
    }

    // Add listeners to input/textarea fields to save data on blur
    function addSaveListeners(weekKey) {
        const inputs = mainContent.querySelectorAll(`[data-week="${weekKey}"], [data-reflection="${weekKey}"]`);
        inputs.forEach(input => {
            input.addEventListener('blur', (event) => {
                const target = event.target;
                const week = target.dataset.week;
                const field = target.dataset.field;
                const reflectionWeek = target.dataset.reflection;

                if (week && field) {
                     // Ensure the week object exists
                     if (!appData[week]) appData[week] = {};
                    appData[week][field] = target.value;
                } else if (reflectionWeek) {
                    if (!appData.reflections) appData.reflections = {};
                    appData.reflections[reflectionWeek] = target.value;
                }
                saveData(); // Save after any field is updated
            });
        });
    }

    // Set active class on current nav link
    function setActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

     // Mobile Nav Toggle
    function toggleNav() {
        sidebarNav.classList.toggle('open');
    }
    function closeNav() {
        sidebarNav.classList.remove('open');
    }


    // --- Initialization ---
    loadData(); // Load existing data first

    // Set up event listeners
    sidebarNav.addEventListener('click', handleNavClick);
    navToggle.addEventListener('click', toggleNav);
    window.addEventListener('hashchange', handleHashChange); // Listen for URL hash changes

    // Initial load based on hash or default
    handleHashChange(); // Load initial section based on current hash or default

}); // End DOMContentLoaded