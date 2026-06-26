// Edit Post Page - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCharCounters();
    initializeTagInput();
    initializeFeaturedImageUpload();
    initializeEditorToolbar();
    initializeFormEvents();
});

/**
 * Initialize character counters for title and excerpt
 */
function initializeCharCounters() {
    const titleInput = document.getElementById('postTitle');
    const excerptInput = document.getElementById('postExcerpt');

    if (titleInput) {
        titleInput.addEventListener('input', function() {
            updateCharCounter(this, 100);
        });
        updateCharCounter(titleInput, 100);
    }

    if (excerptInput) {
        excerptInput.addEventListener('input', function() {
            updateCharCounter(this, 200);
        });
        updateCharCounter(excerptInput, 200);
    }
}

/**
 * Update character counter display
 */
function updateCharCounter(input, maxLength) {
    const counter = input.closest('div').querySelector('.char-counter');
    if (counter) {
        const length = input.value.length;
        counter.textContent = `${length} / ${maxLength}`;
    }
}

/**
 * Initialize tag input functionality
 */
function initializeTagInput() {
    const tagInput = document.getElementById('tagInput');
    const tagsList = document.getElementById('tagsList');

    if (tagInput) {
        tagInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tagText = this.value.trim();
                if (tagText && tagText.length > 0) {
                    addTag(tagText);
                    this.value = '';
                }
            }
        });
    }

    // Remove tag functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-remove-tag')) {
            e.preventDefault();
            e.target.closest('.tag-item').remove();
        }
    });
}

/**
 * Add a new tag
 */
function addTag(tagText) {
    const tagsList = document.getElementById('tagsList');
    const tagElement = document.createElement('span');
    tagElement.className = 'tag-item';
    tagElement.innerHTML = `${tagText} <button type="button" class="btn-remove-tag">×</button>`;
    tagsList.appendChild(tagElement);
}

/**
 * Initialize featured image upload
 */
function initializeFeaturedImageUpload() {
    const changeImageBtn = document.getElementById('changeImageBtn');
    const imageInput = document.getElementById('featuredImageInput');
    const imagePreview = document.getElementById('featuredImagePreview');

    if (changeImageBtn && imageInput) {
        changeImageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            imageInput.click();
        });
    }

    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

/**
 * Initialize editor toolbar buttons
 */
function initializeEditorToolbar() {
    const toolbar = document.querySelector('.editor-toolbar');
    const contentEditor = document.getElementById('postContent');

    if (!toolbar || !contentEditor) return;

    const toolbarButtons = toolbar.querySelectorAll('button');

    toolbarButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            applyEditorFormat(contentEditor, index);
        });
    });
}

/**
 * Apply formatting to editor content
 */
function applyEditorFormat(textarea, buttonIndex) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || 'Text';
    let formattedText = selectedText;

    // Map button index to formatting
    switch(buttonIndex) {
        case 0: // Bold
            formattedText = `**${selectedText}**`;
            break;
        case 1: // Italic
            formattedText = `*${selectedText}*`;
            break;
        case 2: // Underline
            formattedText = `__${selectedText}__`;
            break;
        case 3: // Bullet List
            formattedText = `\n- ${selectedText}\n`;
            break;
        case 4: // Numbered List
            formattedText = `\n1. ${selectedText}\n`;
            break;
        case 5: // Link
            formattedText = `[${selectedText}](URL)`;
            break;
        case 6: // Code
            formattedText = `` + "`" + `${selectedText}` + "`" + ``;
            break;
        case 7: // Quote
            formattedText = `\n> ${selectedText}\n`;
            break;
    }

    // Replace selected text with formatted text
    textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    
    // Move cursor after the formatted text
    textarea.selectionStart = textarea.selectionEnd = start + formattedText.length;
    textarea.focus();
}

/**
 * Initialize form events
 */
function initializeFormEvents() {
    const form = document.getElementById('editPostForm');
    const cancelBtn = form.querySelector('button[type="button"]:first-of-type');
    const saveAsdraft = document.querySelector('.btn-light');
    const updatePostBtn = document.querySelector('.btn-success');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                window.history.back();
            }
        });
    }

    if (saveAsDraft) {
        saveAsdraft.addEventListener('click', function(e) {
            e.preventDefault();
            savePostAsDraft();
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePost();
        });
    }
}

/**
 * Save post as draft
 */
function savePostAsDraft() {
    const formData = getFormData();
    console.log('Saving as draft:', formData);
    
    // Show success message
    showNotification('Post saved as draft!', 'success');
}

/**
 * Update post
 */
function updatePost() {
    const formData = getFormData();
    console.log('Updating post:', formData);
    
    // Validate form
    if (!validateForm(formData)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Show success message
    showNotification('Post updated successfully!', 'success');
    
    // In a real application, you would send this data to the server
    // fetch('/api/posts/1/edit', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // })
}

/**
 * Get form data
 */
function getFormData() {
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const excerpt = document.getElementById('postExcerpt').value;
    const content = document.getElementById('postContent').value;
    const publishDate = document.querySelector('input[type="date"]').value;
    const publishTime = document.querySelector('input[type="time"]').value;

    // Get tags
    const tags = [];
    document.querySelectorAll('.tag-item').forEach(tag => {
        const text = tag.textContent.trim().replace('×', '').trim();
        if (text) tags.push(text);
    });

    // Get selected categories
    const categories = [];
    document.querySelectorAll('.category-check-item input:checked').forEach(checkbox => {
        categories.push(checkbox.nextElementSibling.textContent);
    });

    return {
        title,
        category,
        excerpt,
        content,
        tags,
        categories,
        publishDate,
        publishTime,
        status: document.querySelector('.publish-section select').value
    };
}

/**
 * Validate form data
 */
function validateForm(data) {
    if (!data.title || data.title.trim().length === 0) return false;
    if (!data.category || data.category.trim().length === 0) return false;
    if (!data.content || data.content.trim().length === 0) return false;
    return true;
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
    notification.setAttribute('role', 'alert');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

/**
 * Autosave functionality (optional)
 */
function setupAutosave() {
    let saveTimeout;
    const form = document.getElementById('editPostForm');

    if (form) {
        form.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                console.log('Auto-saving...');
                // You can add auto-save logic here
            }, 3000); // Auto-save after 3 seconds of inactivity
        });
    }
}
