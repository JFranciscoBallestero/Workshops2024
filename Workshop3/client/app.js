document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const addMajorForm = document.getElementById('addMajorForm');
    const searchMajorForm = document.getElementById('searchMajorForm');
    const updateMajorForm = document.getElementById('updateMajorForm');
    const deleteMajorForm = document.getElementById('deleteMajorForm');
    const majorsList = document.getElementById('majorsList');

    // Event listeners
    addMajorForm.addEventListener('submit', handleAddMajor);
    searchMajorForm.addEventListener('submit', handleSearchMajor);
    updateMajorForm.addEventListener('submit', handleUpdateMajor);
    deleteMajorForm.addEventListener('submit', handleDeleteMajor);
});

async function handleAddMajor(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const description = document.getElementById('description').value;

    const response = await fetch('http://localhost:3000/api/majors/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, code, description }),
    });

    const newMajor = await response.json();

    if (response.ok) {
        displayMajor(newMajor);
        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('code').value = '';
        document.getElementById('description').value = '';
    } else {
        alert(newMajor.message || 'Failed to add major');
    }
}

async function handleSearchMajor(event) {
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
}

async function handleUpdateMajor(event) {
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
}

async function handleDeleteMajor(event) {
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
}

function displayMajor(major) {
    const majorItem = document.createElement('li');
    majorItem.textContent = `${major.name} - ${major.code}: ${major.description}`;
    majorsList.appendChild(majorItem);
}
