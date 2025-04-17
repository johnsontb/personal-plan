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
                week1: {}, week2: {}, week3: {}, // Updated week 3 structure
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
        // Remove timeLog initialization for Week 3
        // if (!appData.week3.timeLog) appData.week3.timeLog = {};
        if (!appData.reflections) appData.reflections = {};
        // Add initializers for new Week 3 fields if desired (optional, handled by || '')
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
                 renderWeek3(); // Updated call
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

    // --- Rendering Functions (UPDATED) ---

    function renderIntro() { // Update Title and Intro Text
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Personal Plan Journey: Introduction</h2>
                 <h3>Purpose and Goal:</h3>
                 <p>This six-week curriculum provides a structured process designed to empower you, as a follower of Christ, to live a more focused, intentional, and meaningful life aligned with His purposes. The planning process will help you define what and who is most important from a Biblical perspective, assess your current reality, and make deliberate choices to align your daily actions with your deepest God-given priorities. Specifically, the goal is to guide you through confirming your core values, principles, and most important relationships in light of your faith; analyzing your current time allocation honestly; actively addressing your priorities by choosing which activities to cultivate and which time-consuming or less valuable ones to reduce or remove (potentially including de-emphasizing hindering relationships); implementing a practical, actionable personal plan; and integrating spiritual disciplines to foster the inner transformation needed for lasting change—effectively guiding you through a heart-renovation process where your desires and actions increasingly align with your commitment to Christ.</p>

                 <h3>Process:</h3>
                 <p>Over the next six weeks, you will engage in a structured journey designed to create your personal plan. This process involves several key components:</p>
                 <ul>
                    <li><strong>Personal Assessment:</strong> You will dedicate focused time to honestly reflect on your core priorities—the values, principles, and people that matter most—and conduct a detailed assessment of how you currently spend your time.</li>
                    <li><strong>Active Documentation:</strong> Using the "Long-Term Personal Planning Document," you will work through specific questions each week, taking thorough notes and completing sections to capture insights and build your plan step-by-step.</li>
                    <li><strong>Collaborative Refinement:</strong> You are encouraged to share your thoughts, challenges, and emerging plans with trusted individuals (mentor, spouse, friend, group) to gain valuable perspective and refine your document.</li>
                    <li><strong>Strategic Planning:</strong> Based on your assessments, you will make conscious decisions about how to allocate your time and energy, identifying specific activities to add or increase, and others to reduce or eliminate.</li>
                    <li><strong>Integration of Disciplines:</strong> The curriculum includes exploring spiritual disciplines as practices to support inner growth and sustain the outward changes you plan to make.</li>
                    <li><strong>Monitoring & Maintenance:</strong> You will establish a practical system for regularly reviewing your progress and making necessary adjustments to keep your plan alive and effective.</li>
                </ul>
                 <p>This entire process requires your active commitment and engagement throughout the six weeks to yield a truly usable and transformative personal plan.</p>

                 <h3>Requirements:</h3>
                 <ul>
                    <li><strong>A Foundational Desire:</strong> A genuine desire to seek and know the importance of living a Christ-centered life, understanding that this planning process is a tool to better align your daily life with that core commitment.</li>
                    <li><strong>Full Engagement:</strong> Your active participation and commitment throughout the entire six-week process are crucial. This isn't a passive exercise; it requires dedicated time and effort each week.</li>
                    <li><strong>Honest Self-Evaluation:</strong> Be willing to conduct a truthful and sometimes uncomfortable assessment of your current priorities, relationships, and time usage. Progress depends on facing reality clearly.</li>
                    <li><strong>Openness to Sharing:</strong> Be prepared to share your thoughts, emerging ideas, and challenges with trusted others (mentor, spouse, friend, group). Collaboration and feedback are vital for refining your plan and gaining perspective.</li>
                    <li><strong>Diligent Documentation:</strong> Actively work through the questions provided each week, taking thorough notes and thoughtfully completing the sections of your "Long-Term Personal Planning Document." This document becomes your roadmap.</li>
                    <li><strong>Commitment to Completion:</strong> See the process through from start to finish. Each week builds upon the last, and completing the entire curriculum is necessary to develop a comprehensive and actionable plan.</li>
                 </ul>
            </div>`;
    }

    function renderWeek1() { // Update Title and Labels
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 1: Defining Importance</h2>
                <h3>Focus:</h3>
                <p>Deeply exploring and articulating your core values, most significant relationships, and fundamental life principles. Identifying the non-negotiables.</p>

                <h3>Activities:</h3>
                <ol>
                    <li><strong>Brainstorm & Reflect:</strong> Set aside dedicated daily quiet time. Consider: WHAT are your core values, essential life areas, guiding principles? WHO are the key people and relationships?</li>
                    <li><strong>Identify the Primary:</strong> Determine which 'whats' and 'whos' rise above all others as foundational priorities.</li>
                    <li><strong>Document:</strong> Begin filling out the fields below, explaining <em>why</em> these are paramount:</li>
                </ol>

                <!-- Use exact labels from PDF -->
                <label for="w1-values">Core Values, Essential Life Areas, Guiding Principles (What?)</label>
                <textarea id="w1-values" data-week="week1" data-field="coreValues">${appData.week1?.coreValues || ''}</textarea>

                <label for="w1-people">Key People and Relationships (Who?):</label>
                <textarea id="w1-people" data-week="week1" data-field="keyPeople">${appData.week1?.keyPeople || ''}</textarea>

                <label for="w1-why">Why are these primary 'whats' and 'whos' paramount?</label>
                <textarea id="w1-why" data-week="week1" data-field="primaryWhy">${appData.week1?.primaryWhy || ''}</textarea>

                <h3>Reflection Prompt:</h3>
                <p>What feelings emerged distinguishing important things vs. important people? Was it hard to narrow down what and who are most important?</p>
                <label for="w1-reflection">Your Reflection:</label> <!-- Added label for consistency -->
                <textarea id="w1-reflection" data-reflection="week1">${appData.reflections?.week1 || ''}</textarea>

                <h3>Contemplate Before Next Week:</h3>
                <p>Begin thinking more deeply about <em>why</em> each primary priority is so crucial for you. Start to loosely imagine what your life might look like if you were fully living in alignment with these.</p>
            </div>`;
        addSaveListeners('week1');
    }

    function renderWeek2() { // Update Labels, remove Week 1 data display box
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 2: Identifying Your Priorities (Solidifying & Envisioning)</h2>
                <h3>Focus:</h3>
                <p>Reviewing, confirming, and deepening understanding of Week 1 priorities. Envisioning what living these priorities looks like.</p>

                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Review & Refine:</strong> Re-read your entries from <a href="#week1" class="nav-link" data-section="week1">Week 1</a>. Adjust if needed.
                    </li>
                    <li>
                        <strong>Articulate the 'Why':</strong> For each primary priority identified in Week 1, expand on <em>why</em> it's crucial. Deepen your conviction.
                        <!-- Use exact label -->
                        <label for="w2-why-crucial" style="margin-top: 10px; display: block;">Why are these priorities crucial?</label>
                        <textarea id="w2-why-crucial" data-week="week2" data-field="priorityWhyCrucial">${appData.week2?.priorityWhyCrucial || ''}</textarea>
                    </li>
                    <li>
                        <strong>Envision the Ideal:</strong> Brainstorm: What would it <em>look like</em> to fully live these priorities? What specific activities would you be doing? How would you <em>feel</em>? (Capture detailed notes).
                        <!-- Use exact label -->
                        <label for="w2-ideal-vision" style="margin-top: 10px; display: block;">Your Ideal Vision (activities, feelings)</label>
                        <textarea id="w2-ideal-vision" data-week="week2" data-field="idealVision">${appData.week2?.idealVision || ''}</textarea>
                    </li>
                </ol>

                <h3>Reflection Prompt:</h3>
                <p>How did solidifying the 'why' strengthen conviction? Did envisioning the 'ideal state' and key priorities bring clarity?</p>
                <!-- Use exact label -->
                <label for="w2-reflection">Your Reflection</label>
                <textarea id="w2-reflection" data-reflection="week2">${appData.reflections?.week2 || ''}</textarea>

                <h3>Contemplate Before Next Week:</h3>
                <p>With your refined priorities and vision now clearer, prepare yourself to face your <em>current</em> reality without judgment. Decide which method you'll use for detailed time tracking next week (app, notebook, spreadsheet). Mentally commit to the process of honest observation.</p>
            </div>`;

        addSaveListeners('week2');
    }

    // --- *** REWRITE renderWeek3 *** ---
    function renderWeek3() {
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 3: Where and How do You Currently Spend Your Time?</h2>
                <h3>Focus:</h3>
                <p>Objectively tracking and analyzing current time usage with specific detail. Reality check phase.</p>

                <h3>Activities:</h3>
                <ol>
                    <li><strong>Daily Time Tracking:</strong> Spend 10-15 minutes at the conclusion of each day to reflect and specifically record how your time was spent during the day. Try to be specific yet not obsessed with detail.</li>
                    <li><strong>Daily Probing Questions:</strong> Answer briefly in your notes below each day (or summarize for the week):</li>
                </ol>

                <div class="probing-questions-container">
                     <div class="probing-question">
                         <label for="w3-wasted">Looking back at today/this week, was there any time you consider genuinely wasted or non-beneficial? What was it?</label>
                         <textarea id="w3-wasted" data-week="week3" data-field="wastedTime">${appData.week3?.wastedTime || ''}</textarea>
                     </div>

                     <div class="probing-question">
                         <label for="w3-urgent">Were there instances where you were consumed by urgent issues rather than important ones? Describe one.</label>
                         <textarea id="w3-urgent" data-week="week3" data-field="urgentVsImportant">${appData.week3?.urgentVsImportant || ''}</textarea>
                     </div>

                     <div class="probing-question">
                         <label for="w3-deflected">Did your time get deflected away from your stated priorities and consumed by non-priorities? When/How?</label>
                         <textarea id="w3-deflected" data-week="week3" data-field="deflectedTime">${appData.week3?.deflectedTime || ''}</textarea>
                     </div>

                     <div class="probing-question">
                         <label for="w3-focused">Conversely, identify a specific block of time today/this week that was clearly focused on what you consider truly important matters or key relationships. What was it?</label>
                         <textarea id="w3-focused" data-week="week3" data-field="focusedTime">${appData.week3?.focusedTime || ''}</textarea>
                     </div>
                </div>

                <h3>Reflection Prompt:</h3>
                <p>What category consumed surprising time? Remember, not all valuable time must be conventionally "productive." Be sure to recognize and log time that was genuinely beneficial to your spiritual well-being (e.g., prayer, scripture reading, worship), emotional health (e.g., connecting with loved ones, restful hobbies, journaling), and physical wellness (e.g., exercise, adequate sleep, healthy meals).</p>
                <label for="w3-reflection">Your Reflection:</label>
                <textarea id="w3-reflection" data-reflection="week3">${appData.reflections?.week3 || ''}</textarea>

                <h3>Contemplate Before Next Week:</h3>
                <p>Look over the raw data and totals you've compiled in Section 2. Before diving into formal analysis next week, allow yourself to simply notice your initial reactions, feelings, or any surprising patterns. Begin mentally comparing this logged reality with the core priorities you defined in Week 1 and envisioned in Week 2. What discrepancies are already becoming apparent? Prepare to analyze these gaps objectively.</p>
            </div>`;

        addSaveListeners('week3'); // Add listeners for the new textareas
    }

    function renderWeek4() { // Update Labels
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 4: Re-Evaluating Priorities (Analysis & Decision Making)</h2>
                <h3>Focus:</h3>
                <p>Comparing desired priorities (Weeks 1-2) with actual time use (Week 3). Identify discrepancies and needed changes (adding, reducing).</p>

                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Compare Reality vs. Desired:</strong> Compare week 3 and week 2 notes; answer “Reflection Prompt” from week 3 (actual priorities revealed by time log, gaps, satisfaction).
                        <!-- Use exact label -->
                        <label for="w4-reality-vs-desired" style="margin-top: 10px; display: block;">Your comparison & reflection</label>
                        <textarea id="w4-reality-vs-desired" data-week="week4" data-field="realityVsDesired">${appData.week4?.realityVsDesired || ''}</textarea>
                    </li>
                    <li>
                        <strong>Identify Additions/Increases:</strong> What activities reflecting true priorities that need adding/increasing? Estimate time, confirm willingness.
                        <!-- Use exact label -->
                        <label for="w4-additions" style="margin-top: 10px; display: block;">Specific activities to add/increase</label>
                        <textarea id="w4-additions" data-week="week4" data-field="additions">${appData.week4?.additions || ''}</textarea>
                    </li>
                    <li>
                        <strong>Identify Reductions/Removals:</strong> What specific activities (from your notes) will you reduce/remove? List precise sacrifices. Be honest.
                        <!-- Use exact label -->
                        <label for="w4-removals" style="margin-top: 10px; display: block;">Specific activities to reduce/remove</label>
                        <textarea id="w4-removals" data-week="week4" data-field="removals">${appData.week4?.removals || ''}</textarea>
                    </li>
                    <li>
                        <strong>Revise Priorities Formally:</strong> Revise priority list if needed. Explain how changes support goals/values. Document.
                        <!-- Use exact label -->
                        <label for="w4-revised-priorities" style="margin-top: 10px; display: block;">Your revised priorities and rationale</label>
                        <textarea id="w4-revised-priorities" data-week="week4" data-field="revisedPriorities">${appData.week4?.revisedPriorities || ''}</textarea>
                    </li>
                </ol>

                <h3>Reflection Prompt:</h3>
                <p>Most challenging decision (adding/removing)? How does the revised priority list feel?</p>
                <!-- Use exact label -->
                <label for="w4-reflection">Your reflection</label>
                <textarea id="w4-reflection" data-reflection="week4">${appData.reflections?.week4 || ''}</textarea>

                <h3>Contemplate Before Next Week:</h3>
                <p>You have now made key decisions about aligning your time with your priorities. Before structuring the implementation plan next week, think about the practicalities involved. What specific, concrete actions or strategies (like scheduling specific times, setting reminders, changing your environment, establishing rules) could help you successfully integrate the additions and manage the reductions? Consider what type of ongoing support or accountability system might be most effective for you.</p>
            </div>`;
        addSaveListeners('week4');
    }

    function renderWeek5() { // Update Labels
        mainContent.innerHTML = `
            <div class="content-section">
                <h2>Week 5: Developing a Plan, Monitoring Progress and Maintaining Changes</h2>
                <h3>Focus:</h3>
                <p>Creating a concrete action plan for implementation, integrating new habits, and establishing sustainable systems for monitoring and staying on track.</p>

                <h3>Activities:</h3>
                <ol>
                    <li>
                        <strong>Plan Integration & Strategies:</strong> Detail <em>how</em> and <em>when</em> you'll integrate additions, and manage reductions. Consider time blocking, habit stacking (“Atomic Habits” by James Clear), specific rules, environment changes. Document these concrete plans.
                        <!-- Use exact label -->
                        <label for="w5-integration-strategies" style="margin-top: 10px; display: block;">Your concrete integration strategies</label>
                        <textarea id="w5-integration-strategies" data-week="week5" data-field="integrationStrategies">${appData.week5?.integrationStrategies || ''}</textarea>
                    </li>
                    <li>
                        <strong>Develop Monitoring System:</strong> Choose methods (Weekly Review, Journaling, Calendar Blocking, Accountability Partner, Document Review). Document chosen methods and frequency.
                        <!-- Use exact label -->
                        <label for="w5-monitoring-system" style="margin-top: 10px; display: block;">Your chosen monitoring methods & frequency</label>
                        <textarea id="w5-monitoring-system" data-week="week5" data-field="monitoringSystem">${appData.week5?.monitoringSystem || ''}</textarea>
                    </li>
                    <li>
                        <strong>Commit & Begin:</strong> Start implementing the new plan <em>this week</em>! Schedule your first weekly review. (Important: this activity is about action, not just documentation, but you can make a note of your commitment)
                        <!-- No specific input field for this action step -->
                    </li>
                </ol>

                <h3>Reflection Prompt:</h3>
                <p>Which monitoring strategy feels most practical? First step today/tomorrow to implement the plan?</p>
                 <!-- Use exact label -->
                <label for="w5-reflection">Your reflection</label>
                <textarea id="w5-reflection" data-reflection="week5">${appData.reflections?.week5 || ''}</textarea>

                <h3>Contemplate Before Next Week:</h3>
                <p>As your practical plan begins to take shape and implementation starts, shift your focus inward. Consider what internal resources—mental, emotional, spiritual—will be needed to sustain these outward changes long-term. How does your current inner state (peace, stress, focus, distraction) impact your ability to follow through? Begin thinking about whether intentional practices aimed at cultivating inner strength, peace, or connection might support your journey, preparing for next week's exploration of spiritual disciplines.</p>
            </div>`;
        addSaveListeners('week5');
    }

    function renderWeek6() { // Update Labels, add Conclusion
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
                         <!-- Use exact label -->
                         <label for="w6-inner-life-impact" style="margin-top: 10px; display: block;">Reflections on inner life impact</label>
                         <textarea id="w6-inner-life-impact" data-week="week6" data-field="innerLifeImpact">${appData.week6?.innerLifeImpact || ''}</textarea>
                    </li>
                    <li>
                        <strong>Exploring Key Disciplines (Select 1-2 relevant to your plan):</strong>
                        <p><strong>Inward Disciplines:</strong> Consider Meditation (listening to God's word/voice), Prayer (dialogue with God), Fasting (abstaining to focus on God), Study (renewing the mind). How might these bring clarity, wisdom, or detachment from lesser things?</p>
                        <p><strong>Outward Disciplines:</strong> Consider Simplicity (freedom from clutter/materialism, managing resources wisely), Solitude (intentional time alone with God), Submission (freedom from needing control), Service (compassionate action). How might these shape your use of time, resources, and interactions, reinforcing your priorities? (Simplicity and Solitude often directly impact time/ focus).</p>
                        <!-- Use exact label -->
                         <label for="w6-selected-disciplines" style="margin-top: 10px; display: block;">Selected disciplines & why (choose 1-2)</label>
                         <textarea id="w6-selected-disciplines" data-week="week6" data-field="selectedDisciplines">${appData.week6?.selectedDisciplines || ''}</textarea>
                    </li>
                    <li>
                        <strong>Plan Integration of Disciplines:</strong> Based on your revised priorities and planned changes (Weeks 4 & 5), identify the specific disciplines that resonate and could realistically be integrated into your life to support your goals (e.g., Start the day with 10 min prayer/meditation focusing on priorities; Practice simplicity by scheduling a "no-spend" day weekly or decluttering one area; Schedule 30 min of solitude weekly for reflection).
                         <!-- Use exact label -->
                         <label for="w6-integration-practices" style="margin-top: 10px; display: block;">Specific integration practices (how you will practice them)</label>
                         <textarea id="w6-integration-practices" data-week="week6" data-field="integrationPractices">${appData.week6?.integrationPractices || ''}</textarea>
                    </li>
                    <li>
                        <strong>Update Plan (Optional but Recommended):</strong> Revisit Week 5 of your Planning Document. Add the chosen spiritual discipline(s) to your implementation and monitoring plan. Note <em>how</em> you will practice it and <em>how</em> you expect it to support your overall plan.
                         <!-- Use exact label -->
                         <label for="w6-support-plan" style="margin-top: 10px; display: block;">How disciplines support your overall plan</label>
                         <textarea id="w6-support-plan" data-week="week6" data-field="supportPlan">${appData.week6?.supportPlan || ''}</textarea>
                    </li>
                </ol>

                <h3>Reflection Prompt:</h3>
                <p>Which spiritual discipline feels most needed or potentially impactful for sustaining your revised priorities? How might cultivating your inner life through disciplines make implementing the practical changes easier or more meaningful?</p>
                <!-- Add label for consistency -->
                <label for="w6-reflection">Your Reflection:</label>
                <textarea id="w6-reflection" data-reflection="week6">${appData.reflections?.week6 || ''}</textarea>

                <h3>Contemplate Moving Forward:</h3>
                <p>This structured curriculum is ending, but your personal planning journey continues. How will you maintain momentum? Solidify your commitment to the monitoring system chosen in Week 5 – schedule your first independent weekly review now. Plan to revisit your full Personal Planning Document periodically (e.g., monthly or quarterly). Think about how you will intentionally weave the chosen spiritual discipline(s) into the regular rhythm of your life beyond this course.</p>

                <!-- Add Conclusion from PDF -->
                <h3>Conclusion:</h3>
                <p>This six-week curriculum provides a comprehensive framework for aligning your daily life with your deepest values and relationships, incorporating both practical planning and the vital dimension of spiritual growth. The journey doesn't end here; consistent implementation, monitoring through the system you established (Week 5), and openness to ongoing inner transformation through practices like those explored in Week 6 are key to lasting change. Revisit this document periodically to ensure it remains a relevant guide for living a purposeful life.</p>
            </div>`;
        addSaveListeners('week6');
    }

    function renderMyPlan() { // Update Week 3 Section and all labels
        // Retrieve data from all weeks (keep this part)
        const week1Data = appData.week1 || {};
        const week2Data = appData.week2 || {};
        const week3Data = appData.week3 || {}; // Week 3 data now holds probing answers
        const week4Data = appData.week4 || {};
        const week5Data = appData.week5 || {};
        const week6Data = appData.week6 || {};
        const reflectionsData = appData.reflections || {};

        // Helper to format text area content
        const formatText = (text) => text?.replace(/\n/g, '<br>') || 'N/A';

        let planHtml = `
            <div class="content-section">
                <h2>My Complete Personal Plan</h2>
                <p>Here's a summary of your plan as documented throughout the curriculum.</p>

                <h3>Week 1: Defining Importance</h3>
                <h4>Core Values, Essential Life Areas, Guiding Principles (What?):</h4>
                <p>${formatText(week1Data.coreValues)}</p>
                <h4>Key People and Relationships (Who?):</h4>
                <p>${formatText(week1Data.keyPeople)}</p>
                <h4>Why are these primary 'whats' and 'whos' paramount?</h4>
                <p>${formatText(week1Data.primaryWhy)}</p>

                <h3>Week 2: Identifying Your Priorities</h3>
                <h4>Why are these priorities crucial?</h4>
                <p>${formatText(week2Data.priorityWhyCrucial)}</p>
                <h4>Your Ideal Vision (activities, feelings)</h4>
                <p>${formatText(week2Data.idealVision)}</p>

                <!-- *** UPDATE WEEK 3 DISPLAY *** -->
                <h3>Week 3: Current Time Usage</h3>
                <h4>Daily Probing Question Summaries:</h4>
                 <p><strong>Wasted/Non-Beneficial Time:</strong><br>${formatText(week3Data.wastedTime)}</p>
                 <p><strong>Urgent vs. Important Instances:</strong><br>${formatText(week3Data.urgentVsImportant)}</p>
                 <p><strong>Time Deflected from Priorities:</strong><br>${formatText(week3Data.deflectedTime)}</p>
                 <p><strong>Focused Time on Important Matters/Relationships:</strong><br>${formatText(week3Data.focusedTime)}</p>
                 <!-- End Update Week 3 Display -->

                <h3>Week 4: Re-Evaluating Priorities</h3>
                <h4>Your comparison & reflection:</h4>
                <p>${formatText(week4Data.realityVsDesired)}</p>
                <h4>Specific activities to add/increase:</h4>
                <p>${formatText(week4Data.additions)}</p>
                <h4>Specific activities to reduce/remove:</h4>
                <p>${formatText(week4Data.removals)}</p>
                <h4>Your revised priorities and rationale:</h4>
                <p>${formatText(week4Data.revisedPriorities)}</p>

                <h3>Week 5: Developing the Plan & Monitoring</h3>
                <h4>Your concrete integration strategies:</h4>
                <p>${formatText(week5Data.integrationStrategies)}</p>
                <h4>Your chosen monitoring methods & frequency:</h4>
                <p>${formatText(week5Data.monitoringSystem)}</p>

                <h3>Week 6: Integrating Spiritual Disciplines</h3>
                <h4>Reflections on inner life impact:</h4>
                <p>${formatText(week6Data.innerLifeImpact)}</p>
                <h4>Selected disciplines & why:</h4>
                <p>${formatText(week6Data.selectedDisciplines)}</p>
                <h4>Specific integration practices (how you will practice them):</h4>
                <p>${formatText(week6Data.integrationPractices)}</p>
                <h4>How disciplines support your overall plan:</h4>
                <p>${formatText(week6Data.supportPlan)}</p>

                <h3>Reflections:</h3>
                <ul>`;
                    if (reflectionsData && Object.keys(reflectionsData).length > 0) {
                        // Ensure reflections are sorted by week number
                         Object.keys(reflectionsData).sort((a, b) => parseInt(a.substring(4)) - parseInt(b.substring(4))).forEach(key => {
                             const weekNum = key.substring(4);
                             // Use the specific reflection prompt label if available, otherwise generic
                             let promptLabel = `Week ${weekNum} Reflection`;
                             if(key === 'week1') promptLabel = 'Week 1 Reflection (Things vs People)';
                             if(key === 'week2') promptLabel = 'Week 2 Reflection (Why/Clarity)';
                             if(key === 'week3') promptLabel = 'Week 3 Reflection (Surprising Time/Patterns)';
                             if(key === 'week4') promptLabel = 'Week 4 Reflection (Challenging Decision/Feelings)';
                             if(key === 'week5') promptLabel = 'Week 5 Reflection (Monitoring/First Step)';
                             if(key === 'week6') promptLabel = 'Week 6 Reflection (Impactful Discipline/Meaning)';

                             planHtml += `<li><strong>${promptLabel}:</strong><br>${formatText(reflectionsData[key])}</li>`;
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

    // Updated addSaveListeners - Simplified, no subfield logic
    function addSaveListeners(weekKey) {
        const inputs = mainContent.querySelectorAll(`[data-week="${weekKey}"], [data-reflection="${weekKey}"]`);
        inputs.forEach(input => {
            // Use 'blur' for textareas, maybe 'input' for others if needed later
            const eventType = (input.tagName.toLowerCase() === 'textarea') ? 'blur' : 'input'; // Save textareas on blur

            input.addEventListener(eventType, (event) => {
                const target = event.target;
                const week = target.dataset.week;
                const field = target.dataset.field;
                // Removed subfield handling
                const reflectionWeek = target.dataset.reflection;

                if (week && field) {
                    if (!appData[week]) appData[week] = {};
                    // Simplified saving logic
                    appData[week][field] = target.value;
                } else if (reflectionWeek) {
                    if (!appData.reflections) appData.reflections = {};
                    appData.reflections[reflectionWeek] = target.value;
                }
                saveData();
            });
        });
        // Re-attach internal nav link listener if present (important for Week 2 link)
        const internalNavLink = mainContent.querySelector('.nav-link[data-section]');
        if (internalNavLink) {
            internalNavLink.addEventListener('click', handleNavClick);
        }
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