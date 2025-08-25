// EXTRACTION STRATEGY 2: Lists
function extractFromLists($) {
  const coDrivers = []
  
  $('ul li, ol li, .entry-list li, .crew-list li').each((index, element) => {
    const listText = $(element).text().trim()
    
    const patterns = [
      /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g,
      /Crew:\s*([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi,
      /Entry\s*\d+:\s*([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi
    ]
    
    patterns.forEach(pattern => {
      const matches = listText.matchAll(pattern)
      for (const match of matches) {
        if (match[2] && match[2].length > 4) {
          coDrivers.push({
            name: match[2].trim(),
            driver: match[1].trim(),
            source: 'list_extraction'
          })
        }
      }
    })
  })
  
  return coDrivers
}

// EXTRACTION STRATEGY 3: Text-based
function extractFromText($) {
  const coDrivers = []
  
  $('div, p, span').each((index, element) => {
    const elementText = $(element).text().trim()
    
    // Only process reasonably sized text blocks
    if (elementText.length > 10 && elementText.length < 500) {
      const patterns = [
        /Co-driver:\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi,
        /Navigator:\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi,
        /([A-Z][a-z]+ [A-Z][a-z]+)\s*-\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
      ]
      
      patterns.forEach(pattern => {
        const matches = elementText.matchAll(pattern)
        for (const match of matches) {
          if (match[1] && match[1].length > 4) {
            coDrivers.push({
              name: match[1].trim(),
              source: 'text_extraction'
            })
          }
          if (match[2] && match[2].length > 4) {
            coDrivers.push({
              name: match[2].trim(),
              source: 'text_extraction'
            })
          }
        }
      })
    }
  })
  
  return coDrivers
}

// EXTRACTION STRATEGY 4: Forms and inputs
function extractFromForms($) {
  const coDrivers = []
  
  $('form input, form select option').each((index, element) => {
    const value = $(element).val() || $(element).text()
    
    if (value && value.length > 5 && value.includes(' ')) {
      if (isValidCoDriverName(value.trim())) {
        coDrivers.push({
          name: value.trim(),
          source: 'form_extraction'
        })
      }
    }
  })
  
  return coDrivers
}

// Remove duplicate co-drivers
function removeDuplicateCoDrivers(coDrivers) {
  const seen = new Set()
  const unique = []
  
  coDrivers.forEach(cd => {
    const normalizedName = cd.name.toLowerCase().trim()
    if (!seen.has(normalizedName)) {
      seen.add(normalizedName)
      unique.push(cd)
    }
  })
  
  return unique
}

// Validate co-driver names
function isValidCoDriverName(name) {
  if (!name || name.length < 5 || !name.includes(' ')) return false
  
  const parts = name.split(' ')
  if (parts.length !== 2) return false
  
  const [firstName, lastName] = parts
  if (firstName.length < 2 || lastName.length < 2) return false
  if (!/^[A-Z][a-z]+$/.test(firstName) || !/^[A-Z][a-z]+$/.test(lastName)) return false
  
  // Exclude obvious non-names
  const excludeWords = ['Results', 'Entry', 'Driver', 'Rally', 'Stage', 'Time', 'Position', 'Class', 'Overall', 'Championship', 'Event', 'Date', 'Total', 'Points', 'Website', 'Contact', 'Home', 'About']
  if (excludeWords.some(word => name.includes(word))) return false
  
  return true
}
