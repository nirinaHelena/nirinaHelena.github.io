/* ==========================================================================
   Translations + language and theme switches (no dependency).

   How it works
   - <el data-i18n="key">           -> the element's HTML is replaced
   - <el data-i18n-alt="key">       -> the alt attribute is replaced
     (same for data-i18n-aria-label and data-i18n-content)
   - The HTML files already contain the English text, so the pages stay
     readable without JavaScript. When you edit an English text here, edit it
     in the HTML file too.
   - Values are HTML: write &lt; for "<" and &amp; for "&".
   - Personal placeholders start with "TODO:".
   ========================================================================== */

var REPO = "https://github.com/nirinaHelena/heather";
var BLOB = REPO + "/blob/main/";
var FIG = "../../assets/img/heather/";

var I18N = {
  /* ====================================================================== */
  en: {
    /* ---------- shared ---------- */
    "skip": "Skip to content",
    "lang.switch": "FR / EN: switch to French",
    "theme.to_light": "Switch to light theme",
    "theme.to_dark": "Switch to dark theme",
    "nav.label": "Main navigation",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "footer.text": "© 2026 Nirina Helena",

    /* ---------- index.html ---------- */
    "meta.index.title": "Nirina Helena — Portfolio",
    "meta.index.description": "TODO: one-sentence description of the portfolio (about 150 characters).",
    "home.kicker": "TODO: short greeting",
    "home.role": "TODO: job title",
    "home.tagline": "TODO: one or two sentences introducing who you are and what you are looking for.",
    "home.cta_projects": "View projects",
    "home.cta_contact": "Contact",
    "home.photo_alt": "TODO: portrait of Nirina Helena (placeholder image)",

    "about.title": "About",
    "about.p1": "I am a backend developer based in Antananarivo. After a bachelor's degree in computer science at the Haute École d'Informatique (HEI), Software Ecosystem track, I spent a year as a work-study student at Numer Madagascar, where I automated invoicing and payment management. Now on a permanent contract at Aureon Madagascar, I build and maintain the backend of web platforms used by German-speaking clients in Europe, from health coaching to customer support.",
    "about.p2": "Working with production data every day made me want to go further: to understand what data says, not just store it. I earned the Google Data Analytics Professional Certificate and built <a href=\"projects/heather/index.html\">Heather</a>, a complete analysis of 45 years of climate data in Madagascar. I now want to deepen my skills in data science and artificial intelligence, and use them on problems that matter to my country.",

    "experience.title": "Experience",
    "exp.geno.role": "Backend developer",
    "exp.geno.period": "TODO: start date – present",
    "exp.geno.desc": "Health-coaching platform combining DNA analysis, AI coaches and a companion app for a smart ring. I build the backend: Stripe subscriptions and credits, syncing customer feedback with InfoPoint, automated database migrations and zero-downtime deployments.",
    "exp.geno.stack": "<li>TypeScript</li><li>Node.js</li><li>MySQL</li><li>Drizzle ORM</li><li>Stripe</li>",
    "exp.ayu.role": "Backend developer",
    "exp.ayu.period": "TODO: start date – present",
    "exp.ayu.desc": "Ayurvedic coaching app with AI assistants, a personal journal and voice mode. I maintain the production backend: I fix bugs reported by users, restored the Telegram integration and brought the interface up to WCAG contrast standards.",
    "exp.ayu.stack": "<li>TypeScript</li><li>MySQL</li><li>Telegram API</li><li>Stripe</li>",
    "exp.infopoint.role": "Backend developer",
    "exp.infopoint.period": "TODO: start date – present",
    "exp.infopoint.desc": "Internal support tool that centralises feedback and bug reports from GENO and AYU and lets the team reply to customers by chat. I built the sync with GENO (lock plus audit log), which recovered 316 lost feedback items, and a refund workflow where no money moves without human approval.",
    "exp.infopoint.stack": "<li>TypeScript</li><li>Node.js</li><li>MySQL</li><li>Automated testing</li>",
    "exp.birdia.role": "Backend developer (work-study)",
    "exp.birdia.period": "TODO: start date – end date",
    "exp.birdia.desc": "I automated invoice generation and payment management for the platform.",
    "exp.birdia.stack": "<li>TODO: technologies</li>",

    "projects.title": "Projects",
    "projects.heather.title": "Heather — Madagascar Climate Analysis (1981–2025)",
    "projects.heather.desc": "This project analyses 45 years of daily climate data (1981–2025) for six cities of Madagascar to measure how three climate risks that directly affect people have changed: unreliable rains, drought and dangerous heat.",
    "projects.heather.tags": "<li>Python</li><li>pandas</li><li>SciPy</li><li>Matplotlib</li><li>Jupyter</li>",
    "projects.heather.img_alt": "Warming stripes of the six cities",
    "projects.heather.link_page": "Project page",
    "projects.heather.link_report": "HTML report",
    "projects.heather.link_repo": "GitHub repository",

    "skills.title": "Skills",
    "skills.g1.title": "TODO: skill group 1",
    "skills.g1.items": "<li>TODO: skill</li><li>TODO: skill</li><li>TODO: skill</li>",
    "skills.g2.title": "TODO: skill group 2",
    "skills.g2.items": "<li>TODO: skill</li><li>TODO: skill</li><li>TODO: skill</li>",
    "skills.g3.title": "TODO: skill group 3",
    "skills.g3.items": "<li>TODO: skill</li><li>TODO: skill</li><li>TODO: skill</li>",

    "education.title": "Education",
    "edu.hei.title": "TODO: degree title — HEI",
    "edu.hei.period": "TODO: years",
    "edu.hei.desc": "TODO: main subjects, final project, distinction.",
    "edu.gda.title": "Google Data Analytics Professional Certificate",
    "edu.gda.period": "TODO: completion date",
    "edu.gda.desc": "TODO: what the certificate covered and the capstone project.",

    "contact.title": "Contact",
    "contact.intro": "TODO: one sentence inviting people to get in touch.",
    "contact.email": "TODO: email address",
    "contact.github": "GitHub: nirinaHelena",
    "contact.linkedin": "TODO: LinkedIn profile link",
    "contact.cv_fr": "CV in French (PDF)",
    "contact.cv_en": "CV in English (PDF)",

    /* ---------- projects/heather/index.html ---------- */
    "meta.heather.title": "Heather — Madagascar Climate Analysis (1981–2025) | Nirina Helena",
    "meta.heather.description": "45 years of daily climate data for six cities of Madagascar: how unreliable rains, drought and dangerous heat have changed since 1981.",
    "h.nav.portfolio": "← Portfolio",
    "h.nav.summary": "Summary",
    "h.nav.question": "Question",
    "h.nav.data": "Data",
    "h.nav.method": "Method",
    "h.nav.figures": "Figures",
    "h.nav.results": "Results",
    "h.nav.act": "Recommendations",
    "h.nav.limits": "Limitations",
    "h.nav.links": "Links",

    "h.kicker": "Data analysis project",
    "h.title": "Heather — Madagascar Climate Analysis (1981–2025)",
    "h.cta.report": "Read the HTML report",
    "h.cta.repo": "GitHub repository",

    "h.summary.title": "Summary",
    "h.summary.intro": "This project analyses 45 years of daily climate data (1981–2025) for six cities of Madagascar to measure how three climate risks that directly affect people have changed: unreliable rains, drought and dangerous heat.",
    "h.summary.list": `
<li><strong>All six cities have warmed by about 1 °C since 1981</strong> (+0.18 to +0.26 °C per decade), a result confirmed by two independent datasets.</li>
<li><strong>Dangerous heat is the fastest-growing risk:</strong> days above the NOAA "danger" heat-index level have more than tripled on three coasts, reaching about two months per year in Mahajanga.</li>
<li><strong>Rainy seasons have become drier on the northern, western and eastern coasts</strong>, but not on the Highlands or in the South.</li>
<li><strong>The start of the rainy season has not shifted</strong>; in the South (Toliara), unreliable rains are a long-standing problem rather than a new one.</li>
<li><strong>Mahajanga, on the west coast, is the hotspot</strong>: it is the only city where two risks are rising together.</li>`,
    "h.summary.tools": "Tools: Python (pandas, NumPy, SciPy, pymannkendall, Matplotlib, seaborn), Jupyter, three public climate datasets accessed through their APIs.",

    "h.question.title": "Question",
    "h.question.task_title": "Business task",
    "h.question.task": "Use 45 years of daily climate data (1981–2025) to measure how the climate risks that most affect people's lives in Madagascar — unreliable rains, drought and dangerous heat — have evolved, and identify the regions and communities most exposed.",
    "h.question.main": "<strong>Main question:</strong> Is Madagascar's climate becoming harder to live with — less reliable for farmers, drier in the South and more dangerous in the heat — and where is the risk growing fastest?",
    "h.question.keys_title": "Key questions",
    "h.question.keys": `
<li><strong>Rain reliability (food)</strong> — Does the rainy season start later, vary more from year to year, or have more "false starts" (first rains followed by a long dry spell that ruins the sowing)?</li>
<li><strong>Drought (water)</strong> — Are droughts becoming more frequent, longer or more severe, especially in the semi-arid South (Toliara)?</li>
<li><strong>Dangerous heat (health)</strong> — How many days per year exceed heat-index danger thresholds, and is this number increasing?</li>
<li><strong>Inequality between regions</strong> — Which regions face the fastest-growing risks, and are the most exposed regions the same for all three risks?</li>`,
    "h.question.scope_title": "Scope",
    "h.question.scope": `
<tbody>
<tr><th scope="row">Cities</th><td>Antananarivo, Fianarantsoa, Toamasina, Mahajanga, Antsiranana, Toliara</td></tr>
<tr><th scope="row">Period</th><td>1 January 1981 – 31 December 2025, daily values</td></tr>
<tr><th scope="row">Variables</th><td>Mean, maximum and minimum temperature at 2 m (°C), relative humidity (%), heat index (°C), precipitation (mm/day)</td></tr>
<tr><th scope="row">Sources</th><td>ERA5 for temperature, humidity and heat index; CHIRPS for rainfall; NASA POWER as a cross-check</td></tr>
</tbody>`,
    "h.question.out": "<strong>Out of scope:</strong> this project measures climate <em>hazards</em>, not their impacts. Crop yields, food insecurity and health outcomes would require additional data and are planned as a follow-up project (starting with malaria).",
    "h.question.stake_title": "Stakeholders",
    "h.question.stake": `
<thead><tr><th scope="col">Stakeholder</th><th scope="col">How the results could help</th></tr></thead>
<tbody>
<tr><th scope="row">Farmers and agricultural extension services</th><td>Adapt sowing dates and choose crop varieties suited to a less reliable rainy season</td></tr>
<tr><th scope="row">Environmental and food-security organisations</th><td>Target drought preparedness and resilience programmes where the risk grows fastest</td></tr>
<tr><th scope="row">Public-health authorities and municipalities</th><td>Prepare heat-wave alerts and protect the most vulnerable people in cities</td></tr>
<tr><th scope="row">Citizens and local communities</th><td>Understand, with clear figures, how their region's climate has changed in their lifetime</td></tr>
</tbody>`,

    "h.data.title": "Data",
    "h.data.sources_title": "Data sources",
    "h.data.sources": `
<thead><tr><th scope="col">Source</th><th scope="col">Variables used</th><th scope="col">Resolution</th><th scope="col">Retrieved with</th></tr></thead>
<tbody>
<tr><td><a href="https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5">ERA5</a> reanalysis (ECMWF), through the <a href="https://open-meteo.com/">Open-Meteo</a> archive API (<code>models=era5</code>)</td><td>Daily mean, max and min temperature; hourly temperature and humidity (for the heat index)</td><td>0.25° grid cell (about 25 km)</td><td><a href="${BLOB}src/fetch_era5.py"><code>src/fetch_era5.py</code></a>, <a href="${BLOB}src/fetch_era5_heat.py"><code>src/fetch_era5_heat.py</code></a></td></tr>
<tr><td><a href="https://www.chc.ucsb.edu/data/chirps">CHIRPS v2</a> (Climate Hazards Center, UC Santa Barbara), through the <a href="https://climateserv.servirglobal.net/">ClimateSERV</a> API</td><td>Daily rainfall</td><td>0.05° grid cell (about 5 km)</td><td><a href="${BLOB}src/fetch_chirps.py"><code>src/fetch_chirps.py</code></a></td></tr>
<tr><td><a href="https://power.larc.nasa.gov/">NASA POWER</a> (MERRA-2 reanalysis), Daily Point API</td><td>Temperature, humidity and rainfall, <strong>used only as a cross-check</strong></td><td>0.5° × 0.625° grid cell (about 55 × 65 km)</td><td><a href="${BLOB}src/fetch_data.py"><code>src/fetch_data.py</code></a></td></tr>
</tbody>`,
    "h.data.downloaded": "Data were downloaded between 9 and 13 November 2026.",
    "h.data.why": `
<p><strong>Why three sources?</strong> NASA POWER was first used for every variable. Two checks showed its limits:</p>
<ul>
<li><strong>Rainfall:</strong> compared with published long-term normals, NASA POWER puts far too much rain on the Highlands and far too little on the east coast. Rainfall was replaced by CHIRPS, a reference dataset for drought monitoring in Africa that blends satellite imagery with rain-gauge records.</li>
<li><strong>Temperature:</strong> NASA POWER showed an unusually fast warming in Fianarantsoa that diverged from nearby Antananarivo after 2014. Temperature trends were cross-checked with ERA5, which agrees with NASA POWER in four cities but not in Fianarantsoa and Toliara. ERA5 (finer grid, no such divergence) became the main temperature source.</li>
</ul>
<p>Each variable is therefore taken from the source that passed validation.</p>`,
    "h.data.collected_title": "Data collected",
    "h.data.cities": `
<thead><tr><th scope="col">City</th><th scope="col">Climate zone</th><th scope="col">Latitude</th><th scope="col">Longitude</th></tr></thead>
<tbody>
<tr><th scope="row">Antananarivo</th><td>Central Highlands</td><td>-18.91</td><td>47.52</td></tr>
<tr><th scope="row">Fianarantsoa</th><td>Southern Highlands</td><td>-21.45</td><td>47.09</td></tr>
<tr><th scope="row">Toamasina</th><td>East coast</td><td>-18.15</td><td>49.40</td></tr>
<tr><th scope="row">Mahajanga</th><td>West coast</td><td>-15.72</td><td>46.32</td></tr>
<tr><th scope="row">Antsiranana</th><td>Far north</td><td>-12.28</td><td>49.29</td></tr>
<tr><th scope="row">Toliara</th><td>Semi-arid south</td><td>-23.35</td><td>43.67</td></tr>
</tbody>`,
    "h.data.variables": `
<thead><tr><th scope="col">Variable</th><th scope="col">Description</th><th scope="col">Unit</th><th scope="col">Source</th></tr></thead>
<tbody>
<tr><td><code>tmean_era5</code>, <code>tmax_era5</code>, <code>tmin_era5</code></td><td>Daily mean, maximum and minimum air temperature at 2 m (<strong>used for the analysis</strong>)</td><td>°C</td><td>ERA5</td></tr>
<tr><td><code>rh_mean_era5</code></td><td>Daily mean relative humidity at 2 m</td><td>%</td><td>ERA5</td></tr>
<tr><td><code>hi_max_era5</code></td><td>Daily maximum heat index, computed hour by hour with the NOAA formula</td><td>°C</td><td>ERA5</td></tr>
<tr><td><code>rain_chirps</code></td><td>Daily rainfall (<strong>used for the analysis</strong>)</td><td>mm/day</td><td>CHIRPS</td></tr>
<tr><td><code>T2M</code>, <code>T2M_MAX</code>, <code>T2M_MIN</code>, <code>RH2M</code>, <code>PRECTOTCORR</code></td><td>Temperature, humidity and rainfall (cross-check only)</td><td>°C, %, mm/day</td><td>NASA POWER</td></tr>
</tbody>`,
    "h.data.volume": `
<li><strong>Period:</strong> 1 January 1981 – 31 December 2025, one value per day</li>
<li><strong>Volume:</strong> 16,436 days × 6 cities = 98,616 rows per source, stored as one CSV per city in <code>data/raw/</code> (NASA POWER), <code>data/raw/chirps/</code>, <code>data/raw/era5/</code> and <code>data/raw/era5_heat/</code></li>`,
    "h.data.rain_title": "Rainfall validation",
    "h.data.rain_intro": "Mean annual rainfall over 1981–2025, compared with published long-term normals (mostly weather-station records, over different periods: use for order of magnitude only).",
    "h.data.rain": `
<thead><tr><th scope="col">City</th><th scope="col">NASA POWER</th><th scope="col">CHIRPS</th><th scope="col">Published normal</th><th scope="col">NASA POWER error</th><th scope="col">CHIRPS error</th></tr></thead>
<tbody>
<tr><th scope="row">Toamasina</th><td>1,926 mm</td><td>3,271 mm</td><td>3,368 mm</td><td>-43 %</td><td><strong>-3 %</strong></td></tr>
<tr><th scope="row">Antananarivo</th><td>2,371 mm</td><td>1,322 mm</td><td>1,365 mm</td><td>+74 %</td><td><strong>-3 %</strong></td></tr>
<tr><th scope="row">Mahajanga</th><td>1,417 mm</td><td>1,470 mm</td><td>1,476 mm</td><td>-4 %</td><td><strong>0 %</strong></td></tr>
<tr><th scope="row">Fianarantsoa</th><td>2,038 mm</td><td>1,151 mm</td><td>1,085 mm</td><td>+88 %</td><td><strong>+6 %</strong></td></tr>
<tr><th scope="row">Toliara</th><td>550 mm</td><td>312 mm</td><td>about 360 mm (semi-arid south-west)</td><td>+53 %</td><td><strong>-13 %</strong></td></tr>
<tr><th scope="row">Antsiranana</th><td>1,102 mm</td><td>1,156 mm</td><td>940 mm</td><td>+17 %</td><td>+23 %</td></tr>
</tbody>`,
    "h.data.rain_note": "CHIRPS stays within about 15 % of the normals for five cities out of six, while NASA POWER is off by more than 40 % in four of them.",
    "h.data.temp_title": "Temperature cross-check",
    "h.data.temp_intro": "Trend of the annual mean temperature, Sen's slope in °C per decade (all significant, p &lt; 0.05).",
    "h.data.temp": `
<thead><tr><th scope="col">City</th><th scope="col">NASA POWER</th><th scope="col">ERA5</th></tr></thead>
<tbody>
<tr><th scope="row">Antsiranana</th><td>+0.25</td><td>+0.18</td></tr>
<tr><th scope="row">Mahajanga</th><td>+0.20</td><td>+0.20</td></tr>
<tr><th scope="row">Toamasina</th><td>+0.22</td><td>+0.22</td></tr>
<tr><th scope="row">Antananarivo</th><td>+0.25</td><td>+0.26</td></tr>
<tr><th scope="row">Fianarantsoa</th><td><strong>+0.45</strong></td><td>+0.26</td></tr>
<tr><th scope="row">Toliara</th><td><strong>+0.11</strong></td><td>+0.25</td></tr>
</tbody>`,
    "h.data.temp_note": "Both sources agree that every city has warmed; they disagree on the size of the trend in Fianarantsoa and Toliara.",
    "h.data.roccc_title": "Data quality (ROCCC)",
    "h.data.roccc": `
<thead><tr><th scope="col">Criterion</th><th scope="col">Assessment</th></tr></thead>
<tbody>
<tr><th scope="row">Reliable</th><td>All sources come from recognised scientific institutions (ECMWF, UC Santa Barbara Climate Hazards Center, NASA) and are widely used in research, but they are gridded estimates, not weather-station records. Rainfall was checked against published normals and temperature against a second dataset</td></tr>
<tr><th scope="row">Original</th><td>Downloaded directly from the official APIs, with no intermediary dataset</td></tr>
<tr><th scope="row">Comprehensive</th><td>45 years of daily data for 6 cities covering the main climate zones; no missing values and no duplicate dates in any source</td></tr>
<tr><th scope="row">Current</th><td>Covers the period up to 31 December 2025</td></tr>
<tr><th scope="row">Cited</th><td>See <a href="#sources-title"><em>Sources &amp; acknowledgements</em></a></td></tr>
</tbody>`,
    "h.data.known_title": "Known limitations of the data",
    "h.data.known": `
<li><strong>Grid cells, not stations:</strong> each value is an average over a grid cell. Local effects, such as the extra heat of cities, are smoothed out.</li>
<li><strong>CHIRPS daily values are approximations:</strong> CHIRPS is built on 5-day totals that are then split into days. Day-by-day indicators (dry spells, start of the rainy season) should be read as indicative; seasonal totals are more robust.</li>`,

    "h.method.title": "Method",
    "h.method.clean_title": "Cleaning",
    "h.method.clean_intro": `Cleaning is done in <a href="${BLOB}notebooks/01_cleaning.ipynb"><code>notebooks/01_cleaning.ipynb</code></a> with Python (pandas). The output is <code>data/processed/madagascar_climate_daily.csv</code>: 98,616 rows × 18 columns, one row per city per day.`,
    "h.method.clean_summary": "Cleaning log (8 steps)",
    "h.method.clean": `
<thead><tr><th scope="col">Step</th><th scope="col">Operation</th><th scope="col">Result</th></tr></thead>
<tbody>
<tr><th scope="row">1</th><td>Combined the 6 NASA POWER city files and added each city's climate zone</td><td>98,616 rows (16,436 per city); every city mapped to a zone</td></tr>
<tr><th scope="row">1b</th><td>Merged daily CHIRPS rainfall on city and date (one-to-one)</td><td>0 days without a value</td></tr>
<tr><th scope="row">1c</th><td>Merged daily ERA5 temperatures</td><td>0 days without a value</td></tr>
<tr><th scope="row">1d</th><td>Merged ERA5 daily humidity and daily maximum heat index (computed from hourly data, 24 hours checked for every day)</td><td>0 days without a value</td></tr>
<tr><th scope="row">2</th><td>Converted <code>date</code> from text (<code>YYYYMMDD</code>) to a date type</td><td>Dates valid; all measurements stored as numbers</td></tr>
<tr><th scope="row">3</th><td>Replaced the missing-value codes (<code>-999</code> NASA POWER, <code>-9999</code> CHIRPS) with <code>NaN</code></td><td>0 missing values found</td></tr>
<tr><th scope="row">4</th><td>Consistency checks: duplicates, missing days, min ≤ mean ≤ max temperature (both sources), rainfall ≥ 0, humidity 0–100 %, plausible temperature and heat-index ranges</td><td>0 rows failing; no rows removed or modified</td></tr>
<tr><th scope="row">5</th><td>Investigated extreme values</td><td>Hottest day: 39.8 °C (Toliara, 11 Jan 2025). Coldest night: 3.0 °C (Fianarantsoa, 30 Jun 2009). Wettest day in CHIRPS: 434 mm (Toamasina, 7 Apr 1992). The NASA POWER rainfall record (244 mm, Antananarivo, 12 Apr 2020) is not confirmed by CHIRPS (see <a href="#limits"><em>Limitations</em></a>)</td></tr>
<tr><th scope="row">6</th><td>Added <code>year</code>, <code>month</code>, <code>season</code> (rainy: Nov–Apr, dry: May–Oct) and <code>hydro_year</code> (1 July – 30 June)</td><td>Hydrological years 1980 and 2025 are incomplete and are excluded from rainy-season analyses</td></tr>
<tr><th scope="row">7</th><td>Validated mean annual rainfall of both sources against published normals</td><td>CHIRPS retained for all rainfall analyses</td></tr>
<tr><th scope="row">8</th><td>Reordered columns, sorted by city and date, saved the clean file</td><td>98,616 rows × 18 columns</td></tr>
</tbody>`,
    "h.method.trends_title": "Analysis",
    "h.method.trends": `The analysis is in <a href="${BLOB}notebooks/02_analysis.ipynb"><code>notebooks/02_analysis.ipynb</code></a>. Trends use Sen's slope with the Mann-Kendall test (Hamed-Rao correction for autocorrelation where it can be computed); a trend is called significant when p &lt; 0.05.`,

    "h.figures.title": "Figures",
    "h.fig.open": "Open full-size figure",
    "h.fig.hint": "Select a figure to open it full size in a new tab.",
    "h.fig.03.alt": "Warming stripes of the six cities",
    "h.fig.03.cap": "In every city, cool years dominated the 1980s–90s; warm years dominate since 2010.",
    "h.fig.06.alt": "Dangerous-heat days on the coasts",
    "h.fig.06.cap": "Dangerous-heat days have more than tripled in Mahajanga, Toliara and Toamasina since the 1980s.",
    "h.fig.05.alt": "Seasonal drought index: Standardized Precipitation Index (SPI-6)",
    "h.fig.05.cap": "Dry rainy seasons have become more frequent on the northern, western and eastern coasts.",
    "h.fig.04.alt": "Start date of the rainy season in each city since 1981",
    "h.fig.04.cap": "Since 1981, the rainy season has not started significantly later in any city.",
    "h.figures.all_title": "All charts",
    "h.figures.all": `
<thead><tr><th scope="col">Figure</th><th scope="col">Message</th></tr></thead>
<tbody>
<tr><td><a href="${FIG}01_rainfall_normals.png"><code>01_rainfall_normals.png</code></a></td><td>The east coast gets rain all year; everywhere else, it falls between November and April</td></tr>
<tr><td><a href="${FIG}02_temperature_normals.png"><code>02_temperature_normals.png</code></a></td><td>The Highlands are about 5 to 9 °C cooler than the coasts all year round</td></tr>
<tr><td><a href="${FIG}03_warming_stripes.png"><code>03_warming_stripes.png</code></a></td><td>In every city, cool years dominated the 1980s–90s; warm years dominate since 2010</td></tr>
<tr><td><a href="${FIG}04_rainy_season_onset.png"><code>04_rainy_season_onset.png</code></a></td><td>Since 1981, the rainy season has not started significantly later in any city</td></tr>
<tr><td><a href="${FIG}05_drought_spi.png"><code>05_drought_spi.png</code></a></td><td>Dry rainy seasons have become more frequent on the northern, western and eastern coasts</td></tr>
<tr><td><a href="${FIG}06_dangerous_heat_days.png"><code>06_dangerous_heat_days.png</code></a></td><td>Dangerous-heat days have more than tripled in Mahajanga, Toliara and Toamasina since the 1980s</td></tr>
</tbody>`,

    "h.results.title": "Key results",
    "h.results.table": `
<thead><tr><th scope="col">Question</th><th scope="col">Method</th><th scope="col">Answer</th></tr></thead>
<tbody>
<tr><th scope="row">Background warming</th><td>Annual mean temperature, ERA5, cross-checked with NASA POWER</td><td>All six cities warmed by +0.18 to +0.26 °C per decade (about +1 °C since 1981). Daytime maximums rise faster than night-time minimums</td></tr>
<tr><th scope="row">1. Rain reliability</th><td>Onset of the rainy season (first 20 mm in 3 days not followed by 10 dry days within 30 days) and false starts, CHIRPS</td><td>No significant change in any city; false starts slightly decreased. In Toliara, 21 of 44 seasons never reach a reliable onset — a permanent, not a new, problem</td></tr>
<tr><th scope="row">2. Drought</th><td>Seasonal Standardized Precipitation Index (SPI): SPI-6 (November–April rainfall, gamma distribution fitted on 1991–2020) and SPI-3 drought months, CHIRPS</td><td>Drier rainy seasons on the coasts: dry rainy seasons 2 → 7 in Mahajanga, 1 → 6 in Toamasina (significant trend), 3 → 6 in Antsiranana between 1981–2002 and 2003–2024. No trend on the Highlands or in Toliara</td></tr>
<tr><th scope="row">3. Dangerous heat</th><td>Days per year with a daily maximum heat index ≥ 39.4 °C (NOAA "danger" level), computed hourly from ERA5</td><td>More than tripled between 1981–1990 and 2016–2025: Mahajanga 19 → 64, Toliara 8 → 25, Toamasina 4 → 17 days per year (all p &lt; 0.001). No such day on the Highlands</td></tr>
<tr><th scope="row">4. Regions</th><td>Comparison of the three risks city by city</td><td>The most exposed regions differ by risk. <strong>Mahajanga</strong> is the only city where two risks rise together (heat and drought). The Highlands warm as fast as the coasts but are protected from dangerous heat by altitude</td></tr>
</tbody>`,

    "h.act.title": "Recommendations",
    "h.act.intro": "These recommendations follow directly from the measured climate hazards. They do not account for costs or local conditions, and should be discussed with the people concerned.",
    "h.act.table": `
<thead><tr><th scope="col">Stakeholder</th><th scope="col">Recommendation</th><th scope="col">Based on</th></tr></thead>
<tbody>
<tr><th scope="row">Public-health authorities and municipalities</th><td>Set up heat-health warnings on the coasts, starting with Mahajanga, then Toliara and Toamasina: alerts based on the daily heat index, shaded rest and drinking water, outdoor work and school activities moved away from the hottest hours</td><td>Dangerous-heat days rose from 19 to 64 per year in Mahajanga, 8 to 25 in Toliara and 4 to 17 in Toamasina</td></tr>
<tr><th scope="row">Environmental and food-security organisations</th><td>Prioritise drought preparedness on the western, eastern and northern coasts (water storage, drought-tolerant crop varieties), and monitor the seasonal SPI each April to detect a dry rainy season early</td><td>Dry rainy seasons rose from 2 to 7 in Mahajanga, 1 to 6 in Toamasina and 3 to 6 in Antsiranana</td></tr>
<tr><th scope="row">Farmers and agricultural extension services</th><td>Keep current sowing calendars: the start of the rains has not shifted. In the South, only sow after a reliable onset (about 20 mm over 3 days) and favour short-cycle, drought-tolerant crops</td><td>No significant change in onset dates; in Toliara, half of the seasons never reach a reliable onset and 4.4 false starts occur per season</td></tr>
<tr><th scope="row">Citizens and local communities</th><td>Share these results in a simple form (warming stripes, city-level figures) so that people can see how their region's climate has changed in their lifetime</td><td>All six cities warmed by about 1 °C since 1981</td></tr>
</tbody>`,
    "h.act.next_title": "Next steps",
    "h.act.next": `
<li><strong>Validate with ground stations:</strong> compare these results with Météo Madagascar station records.</li>
<li><strong>Cover the far south:</strong> add Androy and Anosy, where the 2020–21 drought hit hardest but which no city in this study represents.</li>
<li><strong>Link climate to health:</strong> combine these data with malaria records (planned follow-up project).</li>
<li><strong>Keep it up to date:</strong> the download scripts can be re-run each year to extend the series.</li>`,

    "h.limits.title": "Limitations",
    "h.limits.list": `
<li><strong>Gridded estimates, not station records:</strong> values describe grid cells of 5 to 25 km, not a precise point in a city.</li>
<li><strong>Six cities cannot represent the whole island:</strong> the severe 2020–21 drought of the far south (Androy, Anosy) does not appear in Toliara, where that season was wetter than normal.</li>
<li><strong>The size of the warming is uncertain in two cities:</strong> NASA POWER and ERA5 disagree for Fianarantsoa (+0.45 vs +0.26 °C per decade) and Toliara (+0.11 vs +0.25); only the direction of the trend is certain there.</li>
<li><strong>Heat index:</strong> computed for shade and light wind; full sunshine and urban heat make conditions worse than the figures show.</li>
<li><strong>Rainy-season onset:</strong> the rule comes from studies of wetter climates and is demanding for semi-arid Toliara; daily CHIRPS values are approximate.</li>
<li><strong>Multiple tests:</strong> with six cities, one p-value below 0.05 can occur by chance; conclusions rely on consistent results across cities, indicators and sources.</li>
<li><strong>The NASA POWER rainfall record is probably a model artefact.</strong> NASA POWER shows a six-day wet episode in Antananarivo (about 680 mm from 11 to 16 April 2020, including 244 mm on 12 April). CHIRPS records no rain at all on the same days, and no matching report was found.</li>
<li><strong>Rainfall validation is approximate:</strong> the published normals cover other periods (e.g. 1961–1990) and some come from secondary compilations.</li>`,

    "h.links.title": "Links",
    "h.links.list": `
<li><a href="${REPO}">GitHub repository: nirinaHelena/heather</a> — code, data and notebooks</li>
<li><a href="report.html">Full HTML report</a> — the analysis notebook with all charts</li>
<li><a href="${BLOB}notebooks/01_cleaning.ipynb">Notebook 01 — cleaning</a></li>
<li><a href="${BLOB}notebooks/02_analysis.ipynb">Notebook 02 — analysis</a></li>`,
    "h.sources.title": "Sources &amp; acknowledgements",
    "h.sources.list": `
<li>Hersbach, H. et al. (2020). The ERA5 global reanalysis. <em>Quarterly Journal of the Royal Meteorological Society</em>, 146, 1999–2049. <a href="https://doi.org/10.1002/qj.3803">https://doi.org/10.1002/qj.3803</a></li>
<li>ERA5 data accessed through the <a href="https://open-meteo.com/">Open-Meteo</a> historical weather API (weather data by Open-Meteo.com).</li>
<li>Funk, C. et al. (2015). The climate hazards infrared precipitation with stations — a new environmental record for monitoring extremes. <em>Scientific Data</em>, 2, 150066. <a href="https://doi.org/10.1038/sdata.2015.66">https://doi.org/10.1038/sdata.2015.66</a></li>
<li>CHIRPS data were accessed through ClimateSERV (NASA / SERVIR).</li>
<li>These data were obtained from the NASA Langley Research Center (LaRC) POWER Project funded through the NASA Earth Science/Applied Science Program.</li>
<li>Heat index: Rothfusz, L. P. (1990). <em>The heat index "equation"</em>. NWS Southern Region Technical Attachment SR 90-23, with the adjustments used by the US National Weather Service.</li>
<li>Published rainfall normals: NOAA climate normals 1961–1990 (Toamasina, Mahajanga) and public climate summaries for the other cities.</li>`
  },

  /* ====================================================================== */
  fr: {
    /* ---------- commun ---------- */
    "skip": "Aller au contenu",
    "lang.switch": "FR / EN : passer en anglais",
    "theme.to_light": "Passer au thème clair",
    "theme.to_dark": "Passer au thème sombre",
    "nav.label": "Navigation principale",
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.education": "Formation",
    "nav.contact": "Contact",
    "footer.text": "© 2026 Nirina Helena",

    /* ---------- index.html ---------- */
    "meta.index.title": "Nirina Helena — Portfolio",
    "meta.index.description": "TODO: description du portfolio en une phrase (environ 150 caractères).",
    "home.kicker": "TODO: courte formule d'accueil",
    "home.role": "TODO: intitulé du poste",
    "home.tagline": "TODO: une ou deux phrases pour dire qui vous êtes et ce que vous recherchez.",
    "home.cta_projects": "Voir les projets",
    "home.cta_contact": "Contact",
    "home.photo_alt": "TODO: portrait de Nirina Helena (image provisoire)",

    "about.title": "À propos",
    "about.p1": "Je suis développeuse backend à Antananarivo. Après une licence en informatique à la Haute École d'Informatique (HEI), parcours Écosystème Logiciel, j'ai passé un an en alternance chez Numer Madagascar, où j'ai automatisé la facturation et la gestion des paiements. Aujourd'hui en CDI chez Aureon Madagascar, je développe et maintiens le backend de plateformes web utilisées par des clients germanophones en Europe, du coaching santé au support client.",
    "about.p2": "Travailler chaque jour avec des données de production m'a donné envie d'aller plus loin&nbsp;: comprendre ce que les données racontent, et pas seulement les stocker. J'ai obtenu le Google Data Analytics Professional Certificate et réalisé <a href=\"projects/heather/index.html\">Heather</a>, une analyse complète de 45 ans de données climatiques à Madagascar. Je souhaite maintenant approfondir la data science et l'intelligence artificielle, pour mettre ces compétences au service de problèmes qui comptent pour mon pays.",

    "experience.title": "Expérience",
    "exp.geno.role": "Développeuse backend",
    "exp.geno.period": "TODO: date de début – aujourd'hui",
    "exp.geno.desc": "Plateforme de coaching santé qui combine analyses ADN, coachs IA et une application connectée à une bague. Je développe le backend&nbsp;: abonnements et crédits avec Stripe, synchronisation des retours clients avec InfoPoint, migrations de base de données automatisées et déploiements sans interruption de service.",
    "exp.geno.stack": "<li>TypeScript</li><li>Node.js</li><li>MySQL</li><li>Drizzle ORM</li><li>Stripe</li>",
    "exp.ayu.role": "Développeuse backend",
    "exp.ayu.period": "TODO: date de début – aujourd'hui",
    "exp.ayu.desc": "Application de coaching ayurvédique avec assistants IA, journal personnel et mode vocal. Je maintiens le backend en production&nbsp;: je corrige les bugs signalés par les clientes, j'ai rétabli l'intégration Telegram et rendu l'interface conforme aux normes de contraste (WCAG).",
    "exp.ayu.stack": "<li>TypeScript</li><li>MySQL</li><li>Telegram API</li><li>Stripe</li>",
    "exp.infopoint.role": "Développeuse backend",
    "exp.infopoint.period": "TODO: date de début – aujourd'hui",
    "exp.infopoint.desc": "Outil de support interne qui centralise les retours et les bugs de GENO et AYU, et permet de répondre aux clients par chat. J'ai construit la synchronisation avec GENO (verrou et journal d'audit), qui a récupéré 316 retours perdus, et un circuit de remboursement où aucun paiement ne part sans validation humaine.",
    "exp.infopoint.stack": "<li>TypeScript</li><li>Node.js</li><li>MySQL</li><li>Tests automatisés</li>",
    "exp.birdia.role": "Développeuse backend (alternance)",
    "exp.birdia.period": "TODO: date de début – date de fin",
    "exp.birdia.desc": "J'ai automatisé la génération des factures et la gestion des paiements de la plateforme.",
    "exp.birdia.stack": "<li>TODO: technologies</li>",

    "projects.title": "Projets",
    "projects.heather.title": "Heather — Analyse climatique de Madagascar (1981–2025)",
    "projects.heather.desc": "Ce projet analyse 45 ans de données climatiques journalières (1981–2025) dans six villes de Madagascar pour mesurer l'évolution de trois risques climatiques qui touchent directement la population : des pluies peu fiables, la sécheresse et la chaleur dangereuse.",
    "projects.heather.tags": "<li>Python</li><li>pandas</li><li>SciPy</li><li>Matplotlib</li><li>Jupyter</li>",
    "projects.heather.img_alt": "Bandes de réchauffement des six villes",
    "projects.heather.link_page": "Page du projet",
    "projects.heather.link_report": "Rapport HTML",
    "projects.heather.link_repo": "Dépôt GitHub",

    "skills.title": "Compétences",
    "skills.g1.title": "TODO: groupe de compétences 1",
    "skills.g1.items": "<li>TODO: compétence</li><li>TODO: compétence</li><li>TODO: compétence</li>",
    "skills.g2.title": "TODO: groupe de compétences 2",
    "skills.g2.items": "<li>TODO: compétence</li><li>TODO: compétence</li><li>TODO: compétence</li>",
    "skills.g3.title": "TODO: groupe de compétences 3",
    "skills.g3.items": "<li>TODO: compétence</li><li>TODO: compétence</li><li>TODO: compétence</li>",

    "education.title": "Formation",
    "edu.hei.title": "TODO: intitulé du diplôme — HEI",
    "edu.hei.period": "TODO: années",
    "edu.hei.desc": "TODO: matières principales, projet de fin d'études, mention.",
    "edu.gda.title": "Google Data Analytics Professional Certificate",
    "edu.gda.period": "TODO: date d'obtention",
    "edu.gda.desc": "TODO: contenu du certificat et projet final.",

    "contact.title": "Contact",
    "contact.intro": "TODO: une phrase pour inviter à prendre contact.",
    "contact.email": "TODO: adresse e-mail",
    "contact.github": "GitHub : nirinaHelena",
    "contact.linkedin": "TODO: lien du profil LinkedIn",
    "contact.cv_fr": "CV en français (PDF)",
    "contact.cv_en": "CV en anglais (PDF)",

    /* ---------- projects/heather/index.html ---------- */
    "meta.heather.title": "Heather — Analyse climatique de Madagascar (1981–2025) | Nirina Helena",
    "meta.heather.description": "45 ans de données climatiques journalières dans six villes de Madagascar : l'évolution des pluies peu fiables, de la sécheresse et de la chaleur dangereuse depuis 1981.",
    "h.nav.portfolio": "← Portfolio",
    "h.nav.summary": "Résumé",
    "h.nav.question": "Question",
    "h.nav.data": "Données",
    "h.nav.method": "Méthode",
    "h.nav.figures": "Graphiques",
    "h.nav.results": "Résultats",
    "h.nav.act": "Recommandations",
    "h.nav.limits": "Limites",
    "h.nav.links": "Liens",

    "h.kicker": "Projet d'analyse de données",
    "h.title": "Heather — Analyse climatique de Madagascar (1981–2025)",
    "h.cta.report": "Lire le rapport HTML",
    "h.cta.repo": "Dépôt GitHub",

    "h.summary.title": "Résumé",
    "h.summary.intro": "Ce projet analyse 45 ans de données climatiques journalières (1981–2025) dans six villes de Madagascar pour mesurer l'évolution de trois risques climatiques qui touchent directement la population : des pluies peu fiables, la sécheresse et la chaleur dangereuse.",
    "h.summary.list": `
<li><strong>Les six villes se sont réchauffées d'environ 1&nbsp;°C depuis 1981</strong> (+0,18 à +0,26&nbsp;°C par décennie), un résultat confirmé par deux jeux de données indépendants.</li>
<li><strong>La chaleur dangereuse est le risque qui augmente le plus vite&nbsp;:</strong> les jours dépassant le niveau «&nbsp;danger&nbsp;» de l'indice de chaleur de la NOAA ont plus que triplé sur trois côtes, pour atteindre environ deux mois par an à Mahajanga.</li>
<li><strong>Les saisons des pluies sont devenues moins arrosées sur les côtes nord, ouest et est</strong>, mais pas sur les Hautes Terres ni dans le Sud.</li>
<li><strong>Le début de la saison des pluies ne s'est pas décalé</strong>&nbsp;; dans le Sud (Toliara), les pluies peu fiables sont un problème ancien plutôt que nouveau.</li>
<li><strong>Mahajanga, sur la côte ouest, est le point chaud</strong>&nbsp;: c'est la seule ville où deux risques augmentent en même temps.</li>`,
    "h.summary.tools": "Outils&nbsp;: Python (pandas, NumPy, SciPy, pymannkendall, Matplotlib, seaborn), Jupyter, trois jeux de données climatiques publics consultés via leurs API.",

    "h.question.title": "Question",
    "h.question.task_title": "Objectif de l'analyse",
    "h.question.task": "Utiliser 45 ans de données climatiques journalières (1981–2025) pour mesurer l'évolution des risques climatiques qui pèsent le plus sur la vie des habitants de Madagascar — pluies peu fiables, sécheresse et chaleur dangereuse — et identifier les régions et les communautés les plus exposées.",
    "h.question.main": "<strong>Question principale&nbsp;:</strong> le climat de Madagascar devient-il plus difficile à vivre — moins fiable pour les agriculteurs, plus sec dans le Sud et plus dangereux par la chaleur — et où le risque augmente-t-il le plus vite&nbsp;?",
    "h.question.keys_title": "Questions clés",
    "h.question.keys": `
<li><strong>Fiabilité des pluies (alimentation)</strong> — La saison des pluies commence-t-elle plus tard, varie-t-elle davantage d'une année à l'autre, ou connaît-elle davantage de «&nbsp;faux départs&nbsp;» (premières pluies suivies d'une longue période sèche qui détruit les semis)&nbsp;?</li>
<li><strong>Sécheresse (eau)</strong> — Les sécheresses deviennent-elles plus fréquentes, plus longues ou plus sévères, en particulier dans le Sud semi-aride (Toliara)&nbsp;?</li>
<li><strong>Chaleur dangereuse (santé)</strong> — Combien de jours par an dépassent les seuils de danger de l'indice de chaleur, et ce nombre augmente-t-il&nbsp;?</li>
<li><strong>Inégalités entre régions</strong> — Quelles régions font face aux risques qui augmentent le plus vite, et les régions les plus exposées sont-elles les mêmes pour les trois risques&nbsp;?</li>`,
    "h.question.scope_title": "Périmètre",
    "h.question.scope": `
<tbody>
<tr><th scope="row">Villes</th><td>Antananarivo, Fianarantsoa, Toamasina, Mahajanga, Antsiranana, Toliara</td></tr>
<tr><th scope="row">Période</th><td>1er janvier 1981 – 31 décembre 2025, valeurs journalières</td></tr>
<tr><th scope="row">Variables</th><td>Température moyenne, maximale et minimale à 2&nbsp;m (°C), humidité relative (%), indice de chaleur (°C), précipitations (mm/jour)</td></tr>
<tr><th scope="row">Sources</th><td>ERA5 pour la température, l'humidité et l'indice de chaleur&nbsp;; CHIRPS pour les pluies&nbsp;; NASA POWER comme contrôle croisé</td></tr>
</tbody>`,
    "h.question.out": "<strong>Hors périmètre&nbsp;:</strong> ce projet mesure des <em>aléas</em> climatiques, pas leurs impacts. Les rendements agricoles, l'insécurité alimentaire et les effets sur la santé nécessiteraient des données supplémentaires et sont prévus dans un projet de suivi (en commençant par le paludisme).",
    "h.question.stake_title": "Parties prenantes",
    "h.question.stake": `
<thead><tr><th scope="col">Partie prenante</th><th scope="col">En quoi les résultats peuvent aider</th></tr></thead>
<tbody>
<tr><th scope="row">Agriculteurs et services de vulgarisation agricole</th><td>Adapter les dates de semis et choisir des variétés adaptées à une saison des pluies moins fiable</td></tr>
<tr><th scope="row">Organisations environnementales et de sécurité alimentaire</th><td>Cibler la préparation à la sécheresse et les programmes de résilience là où le risque augmente le plus vite</td></tr>
<tr><th scope="row">Autorités de santé publique et communes</th><td>Préparer des alertes canicule et protéger les personnes les plus vulnérables en ville</td></tr>
<tr><th scope="row">Citoyens et communautés locales</th><td>Comprendre, chiffres clairs à l'appui, comment le climat de leur région a changé au cours de leur vie</td></tr>
</tbody>`,

    "h.data.title": "Données",
    "h.data.sources_title": "Sources de données",
    "h.data.sources": `
<thead><tr><th scope="col">Source</th><th scope="col">Variables utilisées</th><th scope="col">Résolution</th><th scope="col">Récupération</th></tr></thead>
<tbody>
<tr><td>Réanalyse <a href="https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5">ERA5</a> (ECMWF), via l'API d'archives <a href="https://open-meteo.com/">Open-Meteo</a> (<code>models=era5</code>)</td><td>Température journalière moyenne, maximale et minimale&nbsp;; température et humidité horaires (pour l'indice de chaleur)</td><td>Maille de 0,25° (environ 25&nbsp;km)</td><td><a href="${BLOB}src/fetch_era5.py"><code>src/fetch_era5.py</code></a>, <a href="${BLOB}src/fetch_era5_heat.py"><code>src/fetch_era5_heat.py</code></a></td></tr>
<tr><td><a href="https://www.chc.ucsb.edu/data/chirps">CHIRPS v2</a> (Climate Hazards Center, UC Santa Barbara), via l'API <a href="https://climateserv.servirglobal.net/">ClimateSERV</a></td><td>Pluie journalière</td><td>Maille de 0,05° (environ 5&nbsp;km)</td><td><a href="${BLOB}src/fetch_chirps.py"><code>src/fetch_chirps.py</code></a></td></tr>
<tr><td><a href="https://power.larc.nasa.gov/">NASA POWER</a> (réanalyse MERRA-2), API Daily Point</td><td>Température, humidité et pluie, <strong>utilisées uniquement comme contrôle croisé</strong></td><td>Maille de 0,5° × 0,625° (environ 55 × 65&nbsp;km)</td><td><a href="${BLOB}src/fetch_data.py"><code>src/fetch_data.py</code></a></td></tr>
</tbody>`,
    "h.data.downloaded": "Les données ont été téléchargées entre le 9 et le 13 novembre 2026.",
    "h.data.why": `
<p><strong>Pourquoi trois sources&nbsp;?</strong> NASA POWER a d'abord été utilisé pour toutes les variables. Deux vérifications en ont montré les limites&nbsp;:</p>
<ul>
<li><strong>Pluie&nbsp;:</strong> comparé aux normales de long terme publiées, NASA POWER place beaucoup trop de pluie sur les Hautes Terres et beaucoup trop peu sur la côte est. Les pluies ont été remplacées par CHIRPS, un jeu de données de référence pour le suivi de la sécheresse en Afrique, qui combine imagerie satellite et relevés pluviométriques.</li>
<li><strong>Température&nbsp;:</strong> NASA POWER montrait un réchauffement anormalement rapide à Fianarantsoa, qui s'écartait de celui d'Antananarivo, toute proche, après 2014. Les tendances de température ont été recoupées avec ERA5, qui concorde avec NASA POWER dans quatre villes, mais pas à Fianarantsoa ni à Toliara. ERA5 (maille plus fine, sans cette divergence) est devenu la source principale pour la température.</li>
</ul>
<p>Chaque variable provient donc de la source qui a passé la validation.</p>`,
    "h.data.collected_title": "Données collectées",
    "h.data.cities": `
<thead><tr><th scope="col">Ville</th><th scope="col">Zone climatique</th><th scope="col">Latitude</th><th scope="col">Longitude</th></tr></thead>
<tbody>
<tr><th scope="row">Antananarivo</th><td>Hautes Terres centrales</td><td>-18,91</td><td>47,52</td></tr>
<tr><th scope="row">Fianarantsoa</th><td>Hautes Terres du Sud</td><td>-21,45</td><td>47,09</td></tr>
<tr><th scope="row">Toamasina</th><td>Côte est</td><td>-18,15</td><td>49,40</td></tr>
<tr><th scope="row">Mahajanga</th><td>Côte ouest</td><td>-15,72</td><td>46,32</td></tr>
<tr><th scope="row">Antsiranana</th><td>Extrême nord</td><td>-12,28</td><td>49,29</td></tr>
<tr><th scope="row">Toliara</th><td>Sud semi-aride</td><td>-23,35</td><td>43,67</td></tr>
</tbody>`,
    "h.data.variables": `
<thead><tr><th scope="col">Variable</th><th scope="col">Description</th><th scope="col">Unité</th><th scope="col">Source</th></tr></thead>
<tbody>
<tr><td><code>tmean_era5</code>, <code>tmax_era5</code>, <code>tmin_era5</code></td><td>Température de l'air journalière moyenne, maximale et minimale à 2&nbsp;m (<strong>utilisée pour l'analyse</strong>)</td><td>°C</td><td>ERA5</td></tr>
<tr><td><code>rh_mean_era5</code></td><td>Humidité relative journalière moyenne à 2&nbsp;m</td><td>%</td><td>ERA5</td></tr>
<tr><td><code>hi_max_era5</code></td><td>Indice de chaleur maximal journalier, calculé heure par heure avec la formule de la NOAA</td><td>°C</td><td>ERA5</td></tr>
<tr><td><code>rain_chirps</code></td><td>Pluie journalière (<strong>utilisée pour l'analyse</strong>)</td><td>mm/jour</td><td>CHIRPS</td></tr>
<tr><td><code>T2M</code>, <code>T2M_MAX</code>, <code>T2M_MIN</code>, <code>RH2M</code>, <code>PRECTOTCORR</code></td><td>Température, humidité et pluie (contrôle croisé uniquement)</td><td>°C, %, mm/jour</td><td>NASA POWER</td></tr>
</tbody>`,
    "h.data.volume": `
<li><strong>Période&nbsp;:</strong> 1er janvier 1981 – 31 décembre 2025, une valeur par jour</li>
<li><strong>Volume&nbsp;:</strong> 16&nbsp;436 jours × 6 villes = 98&nbsp;616 lignes par source, stockées dans un fichier CSV par ville dans <code>data/raw/</code> (NASA POWER), <code>data/raw/chirps/</code>, <code>data/raw/era5/</code> et <code>data/raw/era5_heat/</code></li>`,
    "h.data.rain_title": "Validation des pluies",
    "h.data.rain_intro": "Pluviométrie annuelle moyenne sur 1981–2025, comparée aux normales de long terme publiées (principalement des relevés de stations météorologiques, sur des périodes différentes&nbsp;: à utiliser uniquement comme ordre de grandeur).",
    "h.data.rain": `
<thead><tr><th scope="col">Ville</th><th scope="col">NASA POWER</th><th scope="col">CHIRPS</th><th scope="col">Normale publiée</th><th scope="col">Erreur NASA POWER</th><th scope="col">Erreur CHIRPS</th></tr></thead>
<tbody>
<tr><th scope="row">Toamasina</th><td>1&nbsp;926&nbsp;mm</td><td>3&nbsp;271&nbsp;mm</td><td>3&nbsp;368&nbsp;mm</td><td>-43&nbsp;%</td><td><strong>-3&nbsp;%</strong></td></tr>
<tr><th scope="row">Antananarivo</th><td>2&nbsp;371&nbsp;mm</td><td>1&nbsp;322&nbsp;mm</td><td>1&nbsp;365&nbsp;mm</td><td>+74&nbsp;%</td><td><strong>-3&nbsp;%</strong></td></tr>
<tr><th scope="row">Mahajanga</th><td>1&nbsp;417&nbsp;mm</td><td>1&nbsp;470&nbsp;mm</td><td>1&nbsp;476&nbsp;mm</td><td>-4&nbsp;%</td><td><strong>0&nbsp;%</strong></td></tr>
<tr><th scope="row">Fianarantsoa</th><td>2&nbsp;038&nbsp;mm</td><td>1&nbsp;151&nbsp;mm</td><td>1&nbsp;085&nbsp;mm</td><td>+88&nbsp;%</td><td><strong>+6&nbsp;%</strong></td></tr>
<tr><th scope="row">Toliara</th><td>550&nbsp;mm</td><td>312&nbsp;mm</td><td>environ 360&nbsp;mm (sud-ouest semi-aride)</td><td>+53&nbsp;%</td><td><strong>-13&nbsp;%</strong></td></tr>
<tr><th scope="row">Antsiranana</th><td>1&nbsp;102&nbsp;mm</td><td>1&nbsp;156&nbsp;mm</td><td>940&nbsp;mm</td><td>+17&nbsp;%</td><td>+23&nbsp;%</td></tr>
</tbody>`,
    "h.data.rain_note": "CHIRPS reste à environ 15&nbsp;% des normales pour cinq villes sur six, alors que NASA POWER s'en écarte de plus de 40&nbsp;% dans quatre d'entre elles.",
    "h.data.temp_title": "Contrôle croisé des températures",
    "h.data.temp_intro": "Tendance de la température moyenne annuelle, pente de Sen en °C par décennie (toutes significatives, p&nbsp;&lt;&nbsp;0,05).",
    "h.data.temp": `
<thead><tr><th scope="col">Ville</th><th scope="col">NASA POWER</th><th scope="col">ERA5</th></tr></thead>
<tbody>
<tr><th scope="row">Antsiranana</th><td>+0,25</td><td>+0,18</td></tr>
<tr><th scope="row">Mahajanga</th><td>+0,20</td><td>+0,20</td></tr>
<tr><th scope="row">Toamasina</th><td>+0,22</td><td>+0,22</td></tr>
<tr><th scope="row">Antananarivo</th><td>+0,25</td><td>+0,26</td></tr>
<tr><th scope="row">Fianarantsoa</th><td><strong>+0,45</strong></td><td>+0,26</td></tr>
<tr><th scope="row">Toliara</th><td><strong>+0,11</strong></td><td>+0,25</td></tr>
</tbody>`,
    "h.data.temp_note": "Les deux sources s'accordent sur le réchauffement de chaque ville&nbsp;; elles divergent sur l'ampleur de la tendance à Fianarantsoa et à Toliara.",
    "h.data.roccc_title": "Qualité des données (ROCCC)",
    "h.data.roccc": `
<thead><tr><th scope="col">Critère</th><th scope="col">Évaluation</th></tr></thead>
<tbody>
<tr><th scope="row">Fiable (<span lang="en">Reliable</span>)</th><td>Toutes les sources proviennent d'institutions scientifiques reconnues (ECMWF, Climate Hazards Center de l'UC Santa Barbara, NASA) et sont largement utilisées en recherche, mais ce sont des estimations sur grille, pas des relevés de stations météorologiques. Les pluies ont été vérifiées par rapport aux normales publiées et la température par rapport à un second jeu de données</td></tr>
<tr><th scope="row">Originale (<span lang="en">Original</span>)</th><td>Téléchargées directement depuis les API officielles, sans jeu de données intermédiaire</td></tr>
<tr><th scope="row">Complète (<span lang="en">Comprehensive</span>)</th><td>45 ans de données journalières pour 6 villes couvrant les principales zones climatiques&nbsp;; aucune valeur manquante ni date en double, quelle que soit la source</td></tr>
<tr><th scope="row">Actuelle (<span lang="en">Current</span>)</th><td>Couvre la période jusqu'au 31 décembre 2025</td></tr>
<tr><th scope="row">Citée (<span lang="en">Cited</span>)</th><td>Voir <a href="#sources-title"><em>Sources et remerciements</em></a></td></tr>
</tbody>`,
    "h.data.known_title": "Limites connues des données",
    "h.data.known": `
<li><strong>Des mailles, pas des stations&nbsp;:</strong> chaque valeur est une moyenne sur une maille de la grille. Les effets locaux, comme le surcroît de chaleur des villes, sont lissés.</li>
<li><strong>Les valeurs journalières de CHIRPS sont des approximations&nbsp;:</strong> CHIRPS repose sur des cumuls de 5 jours, ensuite répartis par jour. Les indicateurs au jour le jour (séquences sèches, début de la saison des pluies) sont à lire comme indicatifs&nbsp;; les cumuls saisonniers sont plus robustes.</li>`,

    "h.method.title": "Méthode",
    "h.method.clean_title": "Nettoyage",
    "h.method.clean_intro": `Le nettoyage est réalisé dans <a href="${BLOB}notebooks/01_cleaning.ipynb"><code>notebooks/01_cleaning.ipynb</code></a> avec Python (pandas). Le résultat est <code>data/processed/madagascar_climate_daily.csv</code>&nbsp;: 98&nbsp;616 lignes × 18 colonnes, une ligne par ville et par jour.`,
    "h.method.clean_summary": "Journal de nettoyage (8 étapes)",
    "h.method.clean": `
<thead><tr><th scope="col">Étape</th><th scope="col">Opération</th><th scope="col">Résultat</th></tr></thead>
<tbody>
<tr><th scope="row">1</th><td>Fusion des 6 fichiers NASA POWER (un par ville) et ajout de la zone climatique de chaque ville</td><td>98&nbsp;616 lignes (16&nbsp;436 par ville)&nbsp;; chaque ville rattachée à une zone</td></tr>
<tr><th scope="row">1b</th><td>Jointure des pluies journalières CHIRPS sur la ville et la date (un pour un)</td><td>0 jour sans valeur</td></tr>
<tr><th scope="row">1c</th><td>Jointure des températures journalières ERA5</td><td>0 jour sans valeur</td></tr>
<tr><th scope="row">1d</th><td>Jointure de l'humidité journalière ERA5 et de l'indice de chaleur maximal journalier (calculé à partir des données horaires, 24 heures vérifiées pour chaque jour)</td><td>0 jour sans valeur</td></tr>
<tr><th scope="row">2</th><td>Conversion de <code>date</code> du format texte (<code>YYYYMMDD</code>) vers un type date</td><td>Dates valides&nbsp;; toutes les mesures stockées sous forme de nombres</td></tr>
<tr><th scope="row">3</th><td>Remplacement des codes de valeur manquante (<code>-999</code> NASA POWER, <code>-9999</code> CHIRPS) par <code>NaN</code></td><td>0 valeur manquante trouvée</td></tr>
<tr><th scope="row">4</th><td>Contrôles de cohérence&nbsp;: doublons, jours manquants, température min ≤ moyenne ≤ max (les deux sources), pluie ≥ 0, humidité 0–100&nbsp;%, plages plausibles de température et d'indice de chaleur</td><td>0 ligne en échec&nbsp;; aucune ligne supprimée ni modifiée</td></tr>
<tr><th scope="row">5</th><td>Examen des valeurs extrêmes</td><td>Jour le plus chaud&nbsp;: 39,8&nbsp;°C (Toliara, 11 janv. 2025). Nuit la plus froide&nbsp;: 3,0&nbsp;°C (Fianarantsoa, 30 juin 2009). Jour le plus pluvieux dans CHIRPS&nbsp;: 434&nbsp;mm (Toamasina, 7 avr. 1992). Le record de pluie de NASA POWER (244&nbsp;mm, Antananarivo, 12 avr. 2020) n'est pas confirmé par CHIRPS (voir <a href="#limits"><em>Limites</em></a>)</td></tr>
<tr><th scope="row">6</th><td>Ajout de <code>year</code>, <code>month</code>, <code>season</code> (pluvieuse&nbsp;: nov.–avr., sèche&nbsp;: mai–oct.) et <code>hydro_year</code> (1er juillet – 30 juin)</td><td>Les années hydrologiques 1980 et 2025 sont incomplètes et exclues des analyses de la saison des pluies</td></tr>
<tr><th scope="row">7</th><td>Validation de la pluviométrie annuelle moyenne des deux sources par rapport aux normales publiées</td><td>CHIRPS retenu pour toutes les analyses de pluie</td></tr>
<tr><th scope="row">8</th><td>Réorganisation des colonnes, tri par ville et par date, enregistrement du fichier propre</td><td>98&nbsp;616 lignes × 18 colonnes</td></tr>
</tbody>`,
    "h.method.trends_title": "Analyse",
    "h.method.trends": `L'analyse se trouve dans <a href="${BLOB}notebooks/02_analysis.ipynb"><code>notebooks/02_analysis.ipynb</code></a>. Les tendances utilisent la pente de Sen avec le test de Mann-Kendall (correction de Hamed-Rao pour l'autocorrélation lorsqu'elle peut être calculée)&nbsp;; une tendance est dite significative lorsque p&nbsp;&lt;&nbsp;0,05.`,

    "h.figures.title": "Graphiques",
    "h.fig.open": "Ouvrir la figure en taille réelle",
    "h.fig.hint": "Sélectionnez une figure pour l'ouvrir en taille réelle dans un nouvel onglet.",
    "h.fig.03.alt": "Bandes de réchauffement des six villes",
    "h.fig.03.cap": "Dans chaque ville, les années fraîches dominaient les années 1980–90&nbsp;; les années chaudes dominent depuis 2010.",
    "h.fig.06.alt": "Jours de chaleur dangereuse sur les côtes",
    "h.fig.06.cap": "Les jours de chaleur dangereuse ont plus que triplé à Mahajanga, Toliara et Toamasina depuis les années 1980.",
    "h.fig.05.alt": "Indice de sécheresse saisonnier : indice de précipitations normalisé (SPI-6)",
    "h.fig.05.cap": "Les saisons des pluies déficitaires sont devenues plus fréquentes sur les côtes nord, ouest et est.",
    "h.fig.04.alt": "Date de début de la saison des pluies dans chaque ville depuis 1981",
    "h.fig.04.cap": "Depuis 1981, la saison des pluies n'a commencé significativement plus tard dans aucune ville.",
    "h.figures.all_title": "Tous les graphiques",
    "h.figures.all": `
<thead><tr><th scope="col">Figure</th><th scope="col">Message</th></tr></thead>
<tbody>
<tr><td><a href="${FIG}01_rainfall_normals.png"><code>01_rainfall_normals.png</code></a></td><td>La côte est reçoit de la pluie toute l'année&nbsp;; partout ailleurs, elle tombe entre novembre et avril</td></tr>
<tr><td><a href="${FIG}02_temperature_normals.png"><code>02_temperature_normals.png</code></a></td><td>Les Hautes Terres sont plus fraîches que les côtes d'environ 5 à 9&nbsp;°C toute l'année</td></tr>
<tr><td><a href="${FIG}03_warming_stripes.png"><code>03_warming_stripes.png</code></a></td><td>Dans chaque ville, les années fraîches dominaient les années 1980–90&nbsp;; les années chaudes dominent depuis 2010</td></tr>
<tr><td><a href="${FIG}04_rainy_season_onset.png"><code>04_rainy_season_onset.png</code></a></td><td>Depuis 1981, la saison des pluies n'a commencé significativement plus tard dans aucune ville</td></tr>
<tr><td><a href="${FIG}05_drought_spi.png"><code>05_drought_spi.png</code></a></td><td>Les saisons des pluies déficitaires sont devenues plus fréquentes sur les côtes nord, ouest et est</td></tr>
<tr><td><a href="${FIG}06_dangerous_heat_days.png"><code>06_dangerous_heat_days.png</code></a></td><td>Les jours de chaleur dangereuse ont plus que triplé à Mahajanga, Toliara et Toamasina depuis les années 1980</td></tr>
</tbody>`,

    "h.results.title": "Résultats clés",
    "h.results.table": `
<thead><tr><th scope="col">Question</th><th scope="col">Méthode</th><th scope="col">Réponse</th></tr></thead>
<tbody>
<tr><th scope="row">Réchauffement de fond</th><td>Température moyenne annuelle, ERA5, recoupée avec NASA POWER</td><td>Les six villes se sont réchauffées de +0,18 à +0,26&nbsp;°C par décennie (environ +1&nbsp;°C depuis 1981). Les maximales diurnes augmentent plus vite que les minimales nocturnes</td></tr>
<tr><th scope="row">1. Fiabilité des pluies</th><td>Début de la saison des pluies (premiers 20&nbsp;mm en 3 jours non suivis de 10 jours secs dans les 30 jours) et faux départs, CHIRPS</td><td>Aucun changement significatif dans aucune ville&nbsp;; les faux départs ont légèrement diminué. À Toliara, 21 saisons sur 44 n'atteignent jamais un début fiable — un problème permanent, et non nouveau</td></tr>
<tr><th scope="row">2. Sécheresse</th><td>Indice de précipitations normalisé (SPI) saisonnier&nbsp;: SPI-6 (pluies de novembre à avril, loi gamma ajustée sur 1991–2020) et mois de sécheresse SPI-3, CHIRPS</td><td>Saisons des pluies moins arrosées sur les côtes&nbsp;: saisons des pluies déficitaires 2 → 7 à Mahajanga, 1 → 6 à Toamasina (tendance significative), 3 → 6 à Antsiranana entre 1981–2002 et 2003–2024. Aucune tendance sur les Hautes Terres ni à Toliara</td></tr>
<tr><th scope="row">3. Chaleur dangereuse</th><td>Jours par an où l'indice de chaleur maximal journalier est ≥ 39,4&nbsp;°C (niveau «&nbsp;danger&nbsp;» de la NOAA), calculé heure par heure à partir d'ERA5</td><td>Plus que triplé entre 1981–1990 et 2016–2025&nbsp;: Mahajanga 19 → 64, Toliara 8 → 25, Toamasina 4 → 17 jours par an (tous p&nbsp;&lt;&nbsp;0,001). Aucun jour de ce type sur les Hautes Terres</td></tr>
<tr><th scope="row">4. Régions</th><td>Comparaison des trois risques ville par ville</td><td>Les régions les plus exposées diffèrent selon le risque. <strong>Mahajanga</strong> est la seule ville où deux risques augmentent ensemble (chaleur et sécheresse). Les Hautes Terres se réchauffent aussi vite que les côtes, mais l'altitude les protège de la chaleur dangereuse</td></tr>
</tbody>`,

    "h.act.title": "Recommandations",
    "h.act.intro": "Ces recommandations découlent directement des aléas climatiques mesurés. Elles ne tiennent pas compte des coûts ni des conditions locales, et doivent être discutées avec les personnes concernées.",
    "h.act.table": `
<thead><tr><th scope="col">Partie prenante</th><th scope="col">Recommandation</th><th scope="col">Fondée sur</th></tr></thead>
<tbody>
<tr><th scope="row">Autorités de santé publique et communes</th><td>Mettre en place des alertes chaleur-santé sur les côtes, en commençant par Mahajanga, puis Toliara et Toamasina&nbsp;: alertes fondées sur l'indice de chaleur journalier, lieux de repos ombragés et eau potable, travail en extérieur et activités scolaires déplacés hors des heures les plus chaudes</td><td>Les jours de chaleur dangereuse sont passés de 19 à 64 par an à Mahajanga, de 8 à 25 à Toliara et de 4 à 17 à Toamasina</td></tr>
<tr><th scope="row">Organisations environnementales et de sécurité alimentaire</th><td>Donner la priorité à la préparation à la sécheresse sur les côtes ouest, est et nord (stockage de l'eau, variétés tolérantes à la sécheresse), et suivre le SPI saisonnier chaque mois d'avril pour détecter tôt une saison des pluies déficitaire</td><td>Les saisons des pluies déficitaires sont passées de 2 à 7 à Mahajanga, de 1 à 6 à Toamasina et de 3 à 6 à Antsiranana</td></tr>
<tr><th scope="row">Agriculteurs et services de vulgarisation agricole</th><td>Conserver les calendriers de semis actuels&nbsp;: le début des pluies ne s'est pas décalé. Dans le Sud, ne semer qu'après un début fiable (environ 20&nbsp;mm en 3 jours) et privilégier des cultures à cycle court, tolérantes à la sécheresse</td><td>Aucun changement significatif des dates de début&nbsp;; à Toliara, la moitié des saisons n'atteignent jamais un début fiable et l'on compte 4,4 faux départs par saison</td></tr>
<tr><th scope="row">Citoyens et communautés locales</th><td>Diffuser ces résultats sous une forme simple (bandes de réchauffement, chiffres par ville) pour que chacun puisse voir comment le climat de sa région a changé au cours de sa vie</td><td>Les six villes se sont réchauffées d'environ 1&nbsp;°C depuis 1981</td></tr>
</tbody>`,
    "h.act.next_title": "Prochaines étapes",
    "h.act.next": `
<li><strong>Valider avec des stations au sol&nbsp;:</strong> comparer ces résultats avec les relevés des stations de Météo Madagascar.</li>
<li><strong>Couvrir l'extrême sud&nbsp;:</strong> ajouter l'Androy et l'Anosy, où la sécheresse de 2020–21 a frappé le plus durement, mais qu'aucune ville de cette étude ne représente.</li>
<li><strong>Relier climat et santé&nbsp;:</strong> combiner ces données avec des données sur le paludisme (projet de suivi prévu).</li>
<li><strong>Maintenir à jour&nbsp;:</strong> les scripts de téléchargement peuvent être relancés chaque année pour prolonger les séries.</li>`,

    "h.limits.title": "Limites",
    "h.limits.list": `
<li><strong>Des estimations sur grille, pas des relevés de stations&nbsp;:</strong> les valeurs décrivent des mailles de 5 à 25&nbsp;km, pas un point précis d'une ville.</li>
<li><strong>Six villes ne peuvent pas représenter toute l'île&nbsp;:</strong> la grave sécheresse de 2020–21 dans l'extrême sud (Androy, Anosy) n'apparaît pas à Toliara, où cette saison a été plus humide que la normale.</li>
<li><strong>L'ampleur du réchauffement est incertaine dans deux villes&nbsp;:</strong> NASA POWER et ERA5 divergent pour Fianarantsoa (+0,45 contre +0,26&nbsp;°C par décennie) et Toliara (+0,11 contre +0,25)&nbsp;; seul le sens de la tendance y est certain.</li>
<li><strong>Indice de chaleur&nbsp;:</strong> calculé à l'ombre et par vent faible&nbsp;; le plein soleil et la chaleur urbaine rendent les conditions pires que ne le montrent les chiffres.</li>
<li><strong>Début de la saison des pluies&nbsp;:</strong> la règle provient d'études de climats plus humides et est exigeante pour Toliara, semi-aride&nbsp;; les valeurs journalières de CHIRPS sont approximatives.</li>
<li><strong>Tests multiples&nbsp;:</strong> avec six villes, une valeur p inférieure à 0,05 peut survenir par hasard&nbsp;; les conclusions reposent sur des résultats cohérents entre villes, indicateurs et sources.</li>
<li><strong>Le record de pluie de NASA POWER est probablement un artefact du modèle.</strong> NASA POWER montre un épisode pluvieux de six jours à Antananarivo (environ 680&nbsp;mm du 11 au 16 avril 2020, dont 244&nbsp;mm le 12 avril). CHIRPS n'enregistre aucune pluie ces mêmes jours, et aucun rapport correspondant n'a été trouvé.</li>
<li><strong>La validation des pluies est approximative&nbsp;:</strong> les normales publiées couvrent d'autres périodes (par ex. 1961–1990) et certaines proviennent de compilations secondaires.</li>`,

    "h.links.title": "Liens",
    "h.links.list": `
<li><a href="${REPO}">Dépôt GitHub&nbsp;: nirinaHelena/heather</a> — code, données et notebooks</li>
<li><a href="report.html">Rapport HTML complet</a> — le notebook d'analyse avec tous les graphiques (en anglais)</li>
<li><a href="${BLOB}notebooks/01_cleaning.ipynb">Notebook 01 — nettoyage</a></li>
<li><a href="${BLOB}notebooks/02_analysis.ipynb">Notebook 02 — analyse</a></li>`,
    "h.sources.title": "Sources et remerciements",
    "h.sources.list": `
<li>Hersbach, H. et al. (2020). The ERA5 global reanalysis. <em>Quarterly Journal of the Royal Meteorological Society</em>, 146, 1999–2049. <a href="https://doi.org/10.1002/qj.3803">https://doi.org/10.1002/qj.3803</a></li>
<li>Données ERA5 consultées via l'API météo historique d'<a href="https://open-meteo.com/">Open-Meteo</a> (données météo par Open-Meteo.com).</li>
<li>Funk, C. et al. (2015). The climate hazards infrared precipitation with stations — a new environmental record for monitoring extremes. <em>Scientific Data</em>, 2, 150066. <a href="https://doi.org/10.1038/sdata.2015.66">https://doi.org/10.1038/sdata.2015.66</a></li>
<li>Les données CHIRPS ont été consultées via ClimateSERV (NASA / SERVIR).</li>
<li>Ces données proviennent du projet POWER du NASA Langley Research Center (LaRC), financé par le programme Earth Science/Applied Science de la NASA.</li>
<li>Indice de chaleur&nbsp;: Rothfusz, L. P. (1990). <em>The heat index "equation"</em>. NWS Southern Region Technical Attachment SR 90-23, avec les ajustements utilisés par le National Weather Service des États-Unis.</li>
<li>Normales de pluie publiées&nbsp;: normales climatiques NOAA 1961–1990 (Toamasina, Mahajanga) et synthèses climatiques publiques pour les autres villes.</li>`
  }
};

/* ==========================================================================
   Behaviour
   ========================================================================== */
(function () {
  if (typeof document === "undefined") { return; }

  var root = document.documentElement;
  var ATTRS = ["alt", "aria-label", "content"];
  var lang = "en";
  var theme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";

  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function write(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  function t(key) {
    var value = I18N[lang][key];
    return value !== undefined ? value : I18N.en[key];
  }

  function updateThemeButton() {
    var button = document.getElementById("theme-toggle");
    if (!button) { return; }
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.setAttribute("aria-label", t(theme === "dark" ? "theme.to_light" : "theme.to_dark"));
  }

  function applyLang(next) {
    lang = I18N[next] ? next : "en";
    root.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var value = t(nodes[i].getAttribute("data-i18n"));
      if (value === undefined) { continue; }
      if (nodes[i].tagName === "TITLE") { nodes[i].textContent = value; }
      else { nodes[i].innerHTML = value; }
    }

    ATTRS.forEach(function (attr) {
      var list = document.querySelectorAll("[data-i18n-" + attr + "]");
      for (var j = 0; j < list.length; j++) {
        var v = t(list[j].getAttribute("data-i18n-" + attr));
        if (v !== undefined) { list[j].setAttribute(attr, v); }
      }
    });

    updateThemeButton();
  }

  function applyTheme(next) {
    theme = next === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", theme);
    updateThemeButton();
  }

  /* Language: saved choice, otherwise the browser language. */
  var savedLang = read("lang");
  var browserLang = (navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  applyLang(savedLang === "fr" || savedLang === "en" ? savedLang : browserLang);

  /* Theme: already applied by the inline script in <head>. */
  applyTheme(theme);

  var langButton = document.getElementById("lang-toggle");
  if (langButton) {
    langButton.addEventListener("click", function () {
      applyLang(lang === "fr" ? "en" : "fr");
      write("lang", lang);
    });
  }

  var themeButton = document.getElementById("theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      applyTheme(theme === "dark" ? "light" : "dark");
      write("theme", theme);
    });
  }

  /* Follow system changes as long as no choice has been saved. */
  if (window.matchMedia) {
    var query = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (event) {
      var saved = read("theme");
      if (saved !== "light" && saved !== "dark") { applyTheme(event.matches ? "dark" : "light"); }
    };
    if (query.addEventListener) { query.addEventListener("change", onChange); }
  }

  /* The switches only work with JavaScript: show them now. */
  var controls = document.getElementById("controls");
  if (controls) { controls.hidden = false; }
})();
