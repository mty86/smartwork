// Utility functions for reading/writing application data in localStorage

export const loadUsers = () => {
  const stored = localStorage.getItem('smartworks_users')
  if (!stored) return []
  try {
    const parsed = JSON.parse(stored)
    // support old object format
    return Array.isArray(parsed) ? parsed : Object.values(parsed)
  } catch (e) {
    console.error('Error parsing stored users', e)
    return []
  }
}

export const saveUsers = (users) => {
  try {
    localStorage.setItem('smartworks_users', JSON.stringify(users))
  } catch (e) {
    console.error('Error saving users', e)
  }
}

export const loadCategories = () => {
  const stored = localStorage.getItem('smartworks_categories')
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error('Error parsing stored categories', e)
    return []
  }
}

export const saveCategories = (categories) => {
  try {
    localStorage.setItem('smartworks_categories', JSON.stringify(categories))
  } catch (e) {
    console.error('Error saving categories', e)
  }
}

export const loadPlans = () => {
  const stored = localStorage.getItem('smartworks_plans')
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error('Error parsing stored plans', e)
    return []
  }
}

export const savePlans = (plans) => {
  try {
    localStorage.setItem('smartworks_plans', JSON.stringify(plans))
  } catch (e) {
    console.error('Error saving plans', e)
  }
}
