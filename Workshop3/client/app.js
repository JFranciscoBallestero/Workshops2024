document.addEventListener('DOMContentLoaded', () => {
    const addMajorForm = document.getElementById('addMajorForm');
    const searchMajorForm = document.getElementById('searchMajorForm');
    const updateMajorForm = document.getElementById('updateMajorForm');
    const deleteMajorForm = document.getElementById('deleteMajorForm');
    const majorsList = document.getElementById('majorsList');

    addMajorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const code = document.getElementById('code').value;
        const description = document.getElementById('description').value;

        const response = await fetch('http://localhost:3000/api/majors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, code, description }),
        });

        const newMajor = await response.json();

        if (response.ok) {
            displayMajor(newMajor);
        } else {
            alert(newMajor.message || 'Failed to add major');
        }
    });

    searchMajorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const code = document.getElementById('searchCode').value;

        const response = await fetch(`http://localhost:3000/api/majors/code/${code}`);

        const major = await response.json();

        if (response.ok) {
            majorsList.innerHTML = '';
            displayMajor(major);
        } else {
            alert(major.message || 'Major not found');
        }
    });

    updateMajorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const code = document.getElementById('updateCode').value;
        const name = document.getElementById('updateName').value;
        const description = document.getElementById('updateDescription').value;

        const response = await fetch(`http://localhost:3000/api/majors/code/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        const updatedMajor = await response.json();

        if (response.ok) {
            alert('Major updated successfully');
        } else {
            alert(updatedMajor.message || 'Failed to update major');
        }
    });

    deleteMajorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const code = document.getElementById('deleteCode').value;

        const response = await fetch(`http://localhost:3000/api/majors/code/${code}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Major deleted successfully');
        } else {
            const errorResponse = await response.json();
            alert(errorResponse.message || 'Failed to delete major');
        }
    });

    const displayMajor = (major) => {
        const majorItem = document.createElement('li');
        majorItem.textContent = `${major.name} - ${major.code}: ${major.description}`;
        majorsList.appendChild(majorItem);
    };
});