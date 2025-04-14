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
    
        addSaveListeners('week2');
        // Add event listener for the internal nav link (needed because we replace innerHTML)
        const internalNavLink = mainContent.querySelector('.nav-link[data-section="week1"]');
        if (internalNavLink) {
            internalNavLink.addEventListener('click', handleNavClick);
        }
    }
    
    function renderWeek3() {
        const timeCategories = [
            "Sleep", "Work/School (incl. related tasks)", "Commuting", "Meals (Prep & Eating)",
            "Chores/Home Maintenance", "Errands", "Family Time (Focused Interaction)",
            "Socializing/Friends (In person/dedicated calls)", "TV/Streaming Services",
            "Video Gaming", "Web Surfing (Non-work)", "Social Media (Browsing/Posting)",
            "Personal Phone Calls (Casual)", "Other Hobbies (Specify)", "Exercise/Physical Activity",
            "Spiritual Practices (Specify type)", "Personal Development/Learning",
            "Rest/Downtime (Unstructured, quiet)", "Other (Specify)"
        ];
    
        let timeLogInputs = '';
        timeCategories.forEach(cat => {
            // Create a simple field key from the category name
            const fieldKey = cat.toLowerCase().replace(/[^a-z0-9]+/g, '');
            // Use the stored value, default to 0 if not set
            const currentValue = appData.week3?.timeLog?.[fieldKey] || '';
            timeLogInputs += `
                <div class="time-log-entry">
                    <label for="w3-${fieldKey}">${cat}:</label>
                    <input type="number" id="w3-${fieldKey}" data-week="week3" data-field="timeLog" data-subfield="${fieldKey}" value="${currentValue}" placeholder="Hours" min="0">
                </div>`;
        });
    
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 3: Where and How do You Currently Spend Your Time?</h2>
                <h3>Focus:</h3>
                <p>Objectively tracking and analyzing current time usage with specific detail. Reality check phase.</p>
    
                <h3>Activities:</h3>
                <ol>
                    <li><strong>Detailed Time Tracking:</strong> For the <em>entire week</em>, meticulously track time. Be specific, breaking down leisure/screen time (TV, gaming, web surfing, social media, personal calls, etc.).</li>
                    <li><strong>Calculate & Document:</strong> Tally hours per category with detailed estimates (approx. 168 hrs total):</li>
                </ol>
    
                <div class="time-log-container">
                    ${timeLogInputs}
                    <p style="text-align: right; margin-top: 1rem; font-weight: bold;">Total Hours: <span id="w3-total-hours">0</span></p>
                </div>
    
                <h3>Reflection Prompt:</h3>
                <p>What category consumed surprising time? What patterns in leisure/screen time?</p>
                <label for="w3-reflection">Your Reflection:</label>
                <textarea id="w3-reflection" data-reflection="week3">${appData.reflections?.week3 || ''}</textarea>
    
                <h3>Contemplate Before Next Week:</h3>
                <p>Look over the raw data and totals you've compiled in Section 2. Before diving into formal analysis next week, allow yourself to simply notice your initial reactions, feelings, or any surprising patterns. Begin mentally comparing this logged reality with the core priorities you defined in Week 1 and envisioned in Week 2. What discrepancies are already becoming apparent? Prepare to analyze these gaps objectively.</p>
            </div>`;
    
        // Add listener for inputs
        addSaveListeners('week3');
    
        // Add listener for calculating total hours dynamically
        const timeInputs = mainContent.querySelectorAll('[data-week="week3"][data-field="timeLog"]');
        const totalHoursSpan = mainContent.getElementById('w3-total-hours');
    
        const calculateTotalHours = () => {
            let total = 0;
            timeInputs.forEach(input => {
                total += parseFloat(input.value) || 0;
            });
            totalHoursSpan.textContent = total;
        };
    
        timeInputs.forEach(input => {
            input.addEventListener('input', calculateTotalHours); // Calculate on every input change
        });
        calculateTotalHours(); // Calculate initial total on load
    }
    
    
    function renderWeek4() {
        // Retrieve relevant data for context
        const week3Log = appData.week3?.timeLog || {};
        const week1Priorities = appData.week1?.coreValues + '\n' + appData.week1?.keyPeople || 'Not defined.';
        const week2Vision = appData.week2?.idealVision || 'Not defined.';
    
        // Format Week 3 data for display
        let week3Summary = 'Time Log Categories:\n';
        Object.keys(week3Log).forEach(key => {
            week3Summary += `  ${key.replace(/([A-Z])/g, ' $1').trim()}: ${week3Log[key] || 0} hours\n`;
        });
    
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 4: Re-Evaluating Priorities (Analysis & Decision Making)</h2>
                <h3>Focus:</h3>
                <p>Comparing desired priorities (Weeks 1-2) with actual time use (Week 3). Identify discrepancies and needed changes (adding, reducing).</p>
    
                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Compare Reality vs. Desired:</strong> Compare your Week 3 time log with your Week 1 priorities and Week 2 vision. Reflect on gaps and satisfaction.
                        <label for="w4-reality-vs-desired" style="margin-top: 10px; display: block;">Your comparison and reflection:</label>
                        <textarea id="w4-reality-vs-desired" data-week="week4" data-field="realityVsDesired">${appData.week4?.realityVsDesired || ''}</textarea>
                    </li>
                    <li>
                        <strong>Identify Additions/Increases:</strong> What activities reflecting true priorities need adding/increasing? Estimate time, confirm willingness.
                        <label for="w4-additions" style="margin-top: 10px; display: block;">Specific activities to add/increase:</label>
                        <textarea id="w4-additions" data-week="week4" data-field="additions">${appData.week4?.additions || ''}</textarea>
                    </li>
                    <li>
                        <strong>Identify Reductions/Removals:</strong> What specific activities (from detailed time log) will you reduce/remove? List precise sacrifices. Be honest.
                        <label for="w4-removals" style="margin-top: 10px; display: block;">Specific activities to reduce/remove:</label>
                        <textarea id="w4-removals" data-week="week4" data-field="removals">${appData.week4?.removals || ''}</textarea>
                    </li>
                    <li>
                        <strong>Revise Priorities Formally:</strong> Revise priority list if needed. Explain how changes support goals/values. Document.
                        <label for="w4-revised-priorities" style="margin-top: 10px; display: block;">Your revised priorities and rationale:</label>
                        <textarea id="w4-revised-priorities" data-week="week4" data-field="revisedPriorities">${appData.week4?.revisedPriorities || ''}</textarea>
                    </li>
                </ol>
    
                <h3>Reflection Prompt:</h3>
                <p>Most challenging decision (adding/removing)? How does the revised priority list feel?</p>
                <label for="w4-reflection">Your Reflection:</label>
                <textarea id="w4-reflection" data-reflection="week4">${appData.reflections?.week4 || ''}</textarea>
    
                <h3>Contemplate Before Next Week:</h3>
                <p>You have now made key decisions about aligning your time with your priorities. Before structuring the implementation plan next week, think about the practicalities involved. What specific, concrete actions or strategies (like scheduling specific times, setting reminders, changing your environment, establishing rules) could help you successfully integrate the additions and manage the reductions? Consider what type of ongoing support or accountability system might be most effective for you.</p>
            </div>`;
    
        addSaveListeners('week4');
    }
    
    function renderWeek5() {
         // Retrieve relevant data for context
         const week4Additions = appData.week4?.additions || 'Not specified.';
         const week4Removals = appData.week4?.removals || 'Not specified.';
    
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 5: Developing a Plan, Monitoring Progress and Maintaining Changes</h2>
                <h3>Focus:</h3>
                <p>Creating a concrete action plan for implementation, integrating new habits, and establishing sustainable systems for monitoring and staying on track.</p>
    
                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Plan Integration & Strategies:</strong> Detail <em>how</em> and <em>when</em> you'll integrate additions, and manage reductions. Consider time blocking, habit stacking, specific rules, environment changes. Document these concrete plans.
                        <label for="w5-integration-strategies" style="margin-top: 10px; display: block;">Your concrete integration strategies:</label>
                        <textarea id="w5-integration-strategies" data-week="week5" data-field="integrationStrategies">${appData.week5?.integrationStrategies || ''}</textarea>
                    </li>
                    <li>
                        <strong>Develop Monitoring System:</strong> Choose methods (Weekly Review, Journaling, Calendar Blocking, Accountability Partner, Document Review). Document chosen methods and frequency.
                        <label for="w5-monitoring-system" style="margin-top: 10px; display: block;">Your chosen monitoring methods & frequency:</label>
                        <textarea id="w5-monitoring-system" data-week="week5" data-field="monitoringSystem">${appData.week5?.monitoringSystem || ''}</textarea>
                    </li>
                    <li>
                        <strong>Commit & Begin:</strong> Start implementing the new plan <em>this week</em>! Schedule your first weekly review. (Note: This activity is about action, not just documentation, but you can make a note of your commitment).
                    </li>
                </ol>
    
                <h3>Reflection Prompt:</h3>
                <p>Which monitoring strategy feels most practical? First step today/tomorrow to implement the plan?</p>
                <label for="w5-reflection">Your Reflection:</label>
                <textarea id="w5-reflection" data-reflection="week5">${appData.reflections?.week5 || ''}</textarea>
    
                <h3>Contemplate Before Next Week:</h3>
                <p>As your practical plan begins to take shape and implementation starts, shift your focus inward. Consider what internal resources—mental, emotional, spiritual—will be needed to sustain these outward changes long-term. How does your current inner state (peace, stress, focus, distraction) impact your ability to follow through? Begin thinking about whether intentional practices aimed at cultivating inner strength, peace, or connection might support your journey, preparing for next week's exploration of spiritual disciplines.</p>
            </div>`;
    
        addSaveListeners('week5');
    }
    
    function renderWeek6() {
        // Retrieve relevant data for context
        const week5Plan = appData.week5?.integrationStrategies || 'Not defined.';
    
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 6: The Importance of Spiritual Disciplines (Integrating Inner Transformation)</h2>
                <h3>Focus:</h3>
                <p>Understanding how spiritual disciplines, as outlined by Richard Foster in "Celebration of Discipline," can support and deepen the practical changes planned, fostering inner transformation that sustains outward actions.</p>
    
                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Introduction to Spiritual Disciplines:</strong>
                        <ul>
                            <li>Read introductory material or summaries about Richard Foster's concept of Spiritual Disciplines (practices that place us before God so He can transform us). Understand they are not ways to earn favor, but ways to open ourselves to God's grace and work.</li>
                            <li>Reflect: How does your inner life (thoughts, attitudes, spiritual connection) affect your ability to live out your priorities? How might intentional spiritual practices support the changes you want to make?</li>
                        </ul>
                         <label for="w6-inner-life-impact" style="margin-top: 10px; display: block;">Reflection on inner life impact:</label>
                         <textarea id="w6-inner-life-impact" data-week="week6" data-field="innerLifeImpact">${appData.week6?.innerLifeImpact || ''}</textarea>
                    </li>
                    <li>
                        <strong>Exploring Key Disciplines (Select 2-3 relevant to your plan):</strong>
                        <p><strong>Inward Disciplines:</strong> Meditation, Prayer, Fasting, Study.</p>
                        <p><strong>Outward Disciplines:</strong> Simplicity, Solitude, Submission, Service.</p>
                         <label for="w6-selected-disciplines" style="margin-top: 10px; display: block;">Selected Disciplines & Why (Choose 1-2):</label>
                         <textarea id="w6-selected-disciplines" data-week="week6" data-field="selectedDisciplines">${appData.week6?.selectedDisciplines || ''}</textarea>
                    </li>
                    <li>
                        <strong>Identify Potential Integration:</strong> Based on your revised priorities and planned changes (Weeks 4 & 5), identify one or two specific disciplines that resonate and could realistically be integrated into your life to support your goals.
                         <label for="w6-integration-practices" style="margin-top: 10px; display: block;">Specific integration practices (How you will practice them):</label>
                         <textarea id="w6-integration-practices" data-week="week6" data-field="integrationPractices">${appData.week6?.integrationPractices || ''}</textarea>
                    </li>
                    <li>
                        <strong>Update Plan (Optional but Recommended):</strong> Revisit Week 5 of your Planning Document. Add the chosen spiritual discipline(s) to your implementation and monitoring plan. Note how you will practice it and how you expect it to support your overall plan.
                         <label for="w6-support-plan" style="margin-top: 10px; display: block;">How disciplines support your overall plan:</label>
                         <textarea id="w6-support-plan" data-week="week6" data-field="supportPlan">${appData.week6?.supportPlan || ''}</textarea>
                    </li>
                </ol>
    
                <h3>Reflection Prompt:</h3>
                <p>Which spiritual discipline feels most needed or potentially impactful for sustaining your revised priorities? How might cultivating your inner life through disciplines make implementing the practical changes easier or more meaningful?</p>
                <label for="w6-reflection">Your Reflection:</label>
                <textarea id="w6-reflection" data-reflection="week6">${appData.reflections?.week6 || ''}</textarea>
    
                <h3>Contemplate Moving Forward:</h3>
                <p>This structured curriculum is ending, but you rpersonal planning journey continues. How will you maintain momentum? Solidify your commitment to the monitoring system chosen in Week 5 – schedule your first independent weekly review now. Plan to revisit your full Personal Planning Document periodically (e.g., monthly or quarterly). Think about how you will intentionally weave the chosen spiritual discipline(s) into the regular rhythm of your life beyond this course.</p>
    
                <h3>Conclusion:</h3>
                <p>This six-week curriculum provides a comprehensive framework for aligning your daily life with your deepest values and relationships, incorporating both practical planning and the vital dimension of spiritual growth. The journey doesn't end here; consistent implementation, monitoring through the system you established (Week 5), and openness to ongoing inner transformation through practices like those explored in Week 6 are key to lasting change. Revisit this document periodically to ensure it remains a relevant guide for living a purposeful life.</p>
            </div>`;
    
        addSaveListeners('week6');
    }
    
    function renderMyPlan() {
        // Retrieve data from all weeks
        const week1Data = appData.week1 || {};
        const week2Data = appData.week2 || {};
        const week3Data = appData.week3 || {};
        const week4Data = appData.week4 || {};
        const week5Data = appData.week5 || {};
        const week6Data = appData.week6 || {};
        const reflectionsData = appData.reflections || {};
    
        let planHtml = `
            <div class="content-section">
                <h2>My Complete Personal Plan</h2>
                <p>Here's a summary of your plan as documented throughout the curriculum.</p>
    
                <h3>Week 1: Defining Importance</h3>
                <h4>Core Values/Principles:</h4>
                <p>${week1Data.coreValues?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Key People:</h4>
                <p>${week1Data.keyPeople?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Why Paramount:</h4>
                <p>${week1Data.primaryWhy?.replace(/\n/g, '<br>') || 'N/A'}</p>
    
                <h3>Week 2: Solidifying & Envisioning</h3>
                <h4>Why Crucial:</h4>
                <p>${week2Data.priorityWhyCrucial?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Ideal Vision:</h4>
                <p>${week2Data.idealVision?.replace(/\n/g, '<br>') || 'N/A'}</p>
    
                <h3>Week 3: Current Time Usage</h3>
                <h4>Time Log Summary:</h4>
                <ul>`;
                    if (week3Data.timeLog && Object.keys(week3Data.timeLog).length > 0) {
                        Object.keys(week3Data.timeLog).forEach(key => {
                            const value = week3Data.timeLog[key];
                             const label = key.replace(/([A-Z])/g, ' $1').trim(); // Basic formatting
                             planHtml += `<li>${label}: ${value || 0} hours</li>`;
                        });
                     } else {
                         planHtml += `<li>N/A</li>`;
                     }
        planHtml += `
                </ul>
    
                <h3>Week 4: Re-Evaluating Priorities</h3>
                <h4>Comparison (Reality vs. Desired):</h4>
                <p>${week4Data.realityVsDesired?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Additions/Increases:</h4>
                <p>${week4Data.additions?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Reductions/Removals:</h4>
                <p>${week4Data.removals?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Revised Priorities:</h4>
                <p>${week4Data.revisedPriorities?.replace(/\n/g, '<br>') || 'N/A'}</p>
    
                <h3>Week 5: Developing the Plan & Monitoring</h3>
                <h4>Integration Strategies:</h4>
                <p>${week5Data.integrationStrategies?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Monitoring System:</h4>
                <p>${week5Data.monitoringSystem?.replace(/\n/g, '<br>') || 'N/A'}</p>
    
                <h3>Week 6: Integrating Spiritual Disciplines</h3>
                <h4>Inner Life Impact:</h4>
                <p>${week6Data.innerLifeImpact?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Selected Disciplines:</h4>
                <p>${week6Data.selectedDisciplines?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Integration Practices:</h4>
                <p>${week6Data.integrationPractices?.replace(/\n/g, '<br>') || 'N/A'}</p>
                <h4>Support Plan:</h4>
                <p>${week6Data.supportPlan?.replace(/\n/g, '<br>') || 'N/A'}</p>
    
                <h3>Reflections:</h3>
                <ul>`;
                    if (reflectionsData && Object.keys(reflectionsData).length > 0) {
                        Object.keys(reflectionsData).forEach(key => {
                            planHtml += `<li><strong>Week ${key.substring(4)}:</strong><br>${reflectionsData[key]?.replace(/\n/g, '<br>') || 'N/A'}</li>`;
                        });
                    } else {
                        planHtml += `<li>No reflections documented yet.</li>`;
                    }
        planHtml += `
                </ul>
            </div>`;
    
        mainContent.innerHTML = planHtml;
    }


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
            // Use 'input' event for number types to update dynamically, 'blur' for others
            const eventType = (input.type === 'number' || input.type === 'range') ? 'input' : 'blur';
    
            input.addEventListener(eventType, (event) => {
                const target = event.target;
                const week = target.dataset.week;
                const field = target.dataset.field;
                const subfield = target.dataset.subfield; // Get the subfield attribute
                const reflectionWeek = target.dataset.reflection;
    
                if (week && field) {
                     // Ensure the week object exists
                     if (!appData[week]) appData[week] = {};
                    // Handle the specific case for Week 3 timeLog
                    if (week === 'week3' && field === 'timeLog' && subfield) {
                         if (!appData.week3.timeLog) appData.week3.timeLog = {}; // Ensure timeLog object exists
                         appData.week3.timeLog[subfield] = target.value;
                    } else {
                        appData[week][field] = target.value;
                    }
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