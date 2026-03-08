// ── SHARED DATA ──
const cityMap = {
  'Andhra Pradesh': ['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool','Tirupati','Rajahmundry','Kakinada','Eluru'],
  'Assam': ['Guwahati','Silchar','Dibrugarh','Jorhat','Nagaon','Tezpur','Lakhimpur'],
  'Bihar': ['Patna','Gaya','Bhagalpur','Muzaffarpur','Darbhanga','Purnia','Arrah'],
  'Chhattisgarh': ['Raipur','Bhilai','Bilaspur','Korba','Rajnandgaon'],
  'Delhi': ['New Delhi','Dwarka','Rohini','Shahdara','Saket','Janakpuri','Lajpat Nagar','Pitampura','Vasant Kunj'],
  'Goa': ['Panaji','Margao','Vasco da Gama','Mapusa'],
  'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Gandhinagar','Anand'],
  'Haryana': ['Faridabad','Gurgaon','Panipat','Ambala','Hisar','Rohtak','Karnal','Sonipat'],
  'Himachal Pradesh': ['Shimla','Manali','Dharamshala','Mandi','Solan'],
  'Jharkhand': ['Ranchi','Jamshedpur','Dhanbad','Bokaro','Hazaribagh'],
  'Karnataka': ['Bengaluru','Mysuru','Hubli','Mangaluru','Belagavi','Ballari','Tumkur','Shivamogga'],
  'Kerala': ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kannur','Kollam','Palakkad'],
  'Madhya Pradesh': ['Bhopal','Indore','Jabalpur','Gwalior','Ujjain','Sagar','Dewas','Satna'],
  'Maharashtra': ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Thane','Navi Mumbai','Solapur','Kolhapur','Amravati'],
  'Manipur': ['Imphal','Thoubal','Bishnupur'],
  'Odisha': ['Bhubaneswar','Cuttack','Rourkela','Berhampur','Sambalpur'],
  'Punjab': ['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Firozpur'],
  'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Kota','Ajmer','Bikaner','Alwar','Bharatpur'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Vellore','Erode','Tiruppur'],
  'Telangana': ['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam','Ramagundam','Mahbubnagar'],
  'Uttar Pradesh': ['Lucknow','Agra','Varanasi','Kanpur','Allahabad','Meerut','Ghaziabad','Noida','Mathura','Bareilly','Aligarh'],
  'Uttarakhand': ['Dehradun','Haridwar','Rishikesh','Nainital','Roorkee'],
  'West Bengal': ['Kolkata','Howrah','Durgapur','Asansol','Siliguri','Malda','Bardhaman']
};

const allStates = Object.keys(cityMap).sort();

// Seed donors stored in localStorage
const DONOR_KEY = 'raktsetu_donors';

// --- DATABASE API CONNECTION ---
const API_URL = 'http://localhost:3000/api';

// Fetch all donors from the MySQL database
async function fetchDonors() {
  try {
    const response = await fetch(`${API_URL}/donors`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching donors:", error);
    return [];
  }
}

// Send a new donor to the MySQL database
async function addDonorToDB(donorData) {
  try {
    const response = await fetch(`${API_URL}/donors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donorData)
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving donor:", error);
  }
}

// Fetch all requirements from the MySQL database
async function fetchRequirements() {
  try {
    const response = await fetch(`${API_URL}/requirements`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return [];
  }
}

// Populate a state dropdown
function populateStates(selectEl) {
  selectEl.innerHTML = '<option value="">Select State</option>';
  allStates.forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = s;
    selectEl.appendChild(o);
  });
}

// Populate cities based on state
function populateCities(stateVal, cityEl) {
  cityEl.innerHTML = '<option value="">Select City</option>';
  if (stateVal && cityMap[stateVal]) {
    cityMap[stateVal].forEach(c => {
      const o = document.createElement('option');
      o.value = c; o.textContent = c;
      cityEl.appendChild(o);
    });
  }
}

// Shared nav HTML
function renderNav(activePage) {
  const pages = [
    { href:'index.html', label:'Home' },
    { href:'post-requirement.html', label:'Post Requirement' },
    { href:'find-donor.html', label:'Find Donor' },
  ];
  return `
  <nav>
    <a class="nav-logo" href="index.html">
      <span class="blood-drop">🩸</span>
      <div class="nav-logo-text">
        <span class="nav-logo-title">RaktSetu</span>
        <span class="nav-logo-sub">Blood & Plasma Portal · India</span>
      </div>
    </a>
    <div class="nav-links">
      ${pages.map(p=>`<a href="${p.href}"${activePage===p.href?' class="active"':''}>${p.label}</a>`).join('')}
      <a href="register.html" class="nav-cta">Become a Donor</a>
    </div>
  </nav>`;
}

// Shared footer
function renderFooter() {
  return `
  <div class="disclaimer-bar">
    <div style="font-size:1.4rem;flex-shrink:0;margin-top:2px">⚠️</div>
    <div>
      <h4>Important Medical Disclaimer</h4>
      <p>RaktSetu is a voluntary donor directory and connection platform only. We do not screen, verify, or guarantee the medical fitness or immediate availability of any listed donor. <strong>Always conduct proper medical blood group testing and pathological screening before accepting any blood or plasma donation.</strong> Consult qualified medical professionals at a licensed hospital or blood bank before proceeding with any transfusion.</p>
    </div>
  </div>
  <footer>
    <div class="footer-logo">🩸 RaktSetu</div>
    <p>India's Voluntary Blood & Plasma Donation Directory · Free to use · Not a medical service</p>
    <p>© 2024 RaktSetu &nbsp;·&nbsp; For emergencies, contact your nearest government blood bank or call <strong style="color:var(--crimson)">104</strong> (National Health Helpline)</p>
    <p style="margin-top:10px;font-size:0.75rem">
      <a href="index.html">Home</a> &nbsp;·&nbsp;
      <a href="find-donor.html">Find Donor</a> &nbsp;·&nbsp;
      <a href="register.html">Register</a> &nbsp;·&nbsp;
      <a href="post-requirement.html">Post Requirement</a>
    </p>
  </footer>`;
}
