export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { name, email, message } = body

  // Validation
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont requis'
    })
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Adresse email invalide'
    })
  }

  try {
    // Email de destination (doit correspondre à la config dans nuxt.config.ts)
    const contactEmail = 'contact@tetha.com'
    const emailSubject = `Contact depuis le site - ${name}`
    const emailBody = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    const emailBodyHtml = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    // Utiliser l'endpoint de nuxt-mail
    const mailResponse = await $fetch('/mail/send', {
      method: 'POST',
      body: {
        from: email,
        to: contactEmail,
        subject: emailSubject,
        text: emailBody,
        html: emailBodyHtml
      }
    })

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    
    // Si l'erreur vient de nuxt-mail (SMTP non configuré), on retourne un message plus clair
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('getaddrinfo')) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Le serveur SMTP n\'est pas configuré. Veuillez configurer les paramètres SMTP dans nuxt.config.ts'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.'
    })
  }
})
