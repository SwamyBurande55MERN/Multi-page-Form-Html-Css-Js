let currentPage = 0;
const form = document.getElementById('form');
const pages = document.getElementsByClassName('page');
const progressBar = document.querySelector('.progress-bar');

showPage(currentPage);

function showPage(pageIndex) {
      pages[pageIndex].classList.add('active');
      updateProgressBar();
      updateNavigationButtons();
}

function hidePage(pageIndex) {
      pages[pageIndex].classList.remove('active');
}

function nextPage() {
      if (validatePage(currentPage)) {
            hidePage(currentPage);
            currentPage++;
            showPage(currentPage);
      }
}

function prevPage() {
      hidePage(currentPage);
      currentPage--;
      showPage(currentPage);
}

function updateProgressBar() {
      const progress = ((currentPage + 1) / pages.length) * 100;
      progressBar.style.width = `${progress}%`;
}

function updateNavigationButtons() {
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');

      prevBtn.disabled = currentPage === 0;
      nextBtn.innerHTML = currentPage === pages.length - 2 ? 'Submit' : 'Next';
}

function validatePage(pageIndex) {
      const inputs = pages[pageIndex].querySelectorAll('input[required]');

      for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                  inputs[i].classList.add('error');
                  return false;
            }
            inputs[i].classList.remove('error');
      }

      return true;
}

function submitForm(event) {
      event.preventDefault();

      const summaryDiv = document.getElementById('summary');
      summaryDiv.innerHTML = '';

      for (let i = 0; i < pages.length - 1; i++) {
            const fields = pages[i].querySelectorAll('input');
            fields.forEach(field => {
                  const label = field.getAttribute('placeholder');
                  const value = field.value;
                  summaryDiv.innerHTML += `<p><strong>${label}:</strong> ${value}</p>`;
            });
      }
      nextBtn.disabled = true;
      // Display confirmation message
      alert('Form submitted successfully!');
}
