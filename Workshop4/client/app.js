document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const addMajorForm = document.getElementById('addMajorForm');
    const searchMajorForm = document.getElementById('searchMajorForm');
    const updateMajorForm = document.getElementById('updateMajorForm');
    const deleteMajorForm = document.getElementById('deleteMajorForm');
    const majorsList = document.getElementById('majorsList');
    const refreshMajorsButton = document.getElementById('refreshMajorsButton');

    // Event listeners
    addMajorForm.addEventListener('submit', handleAddMajor);
    searchMajorForm.addEventListener('submit', handleSearchMajor);
    updateMajorForm.addEventListener('submit', handleUpdateMajor);
    deleteMajorForm.addEventListener('submit', handleDeleteMajor);
    refreshMajorsButton.addEventListener('click', handleRefreshMajors);

    fetchAllMajors();

});

async function fetchAllMajors() {
    try {
        const response = await fetch('http://localhost:3000/api/majors');
        if (!response.ok) {
            throw new Error('Failed to fetch majors');
        }
        const majors = await response.json();
        majorsList.innerHTML = ''; // Clear the list before displaying new items
        majors.forEach(displayMajor);
    } catch (error) {
        console.error('Error fetching majors:', error);
    }
}


async function handleAddMajor(event) {
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

    const name = document.getElementById('searchName').value;

    try {
        const response = await fetch(`http://localhost:3000/api/majors/search?name=${encodeURIComponent(name)}`);
        const majors = await response.json();

        if (response.ok) {
            majorsList.innerHTML = '';
            majors.forEach(major => displayMajor(major));
        } else {
            alert(majors.message || 'Major not found');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to search majors');
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

async function handleRefreshMajors() {
    try {
        const response = await fetch('http://localhost:3000/api/majors');
        const majors = await response.json();

        if (response.ok) {
            majorsList.innerHTML = '';
            majors.forEach(major => displayMajor(major));
        } else {
            alert('Failed to fetch majors');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch majors');
    }
}

function displayMajor(major) {
    const majorItem = document.createElement('li');
    majorItem.textContent = `${major.name} - ${major.code}: ${major.description}`;
    majorsList.appendChild(majorItem);
}
