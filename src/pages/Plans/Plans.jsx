import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { SUBSCRIPTION_PLANS } from '../../utils/constants'
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi'

export const Plans = () => {
  const { user, updateUser, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [selectedBillingCycle, setSelectedBillingCycle] = useState('monthly')

  const handleSubscribe = (planId) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Actualizar suscripción en usuario
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId)
    updateUser({
      subscription: {
        planId,
        planName: plan.name,
        price: plan.price,
        subscribedAt: new Date().toISOString(),
        status: 'active',
      },
    })

    // Redirigir al dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Planes de Suscripción
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Elige el plan perfecto para tu negocio y potencia tu presencia en SmartWorks
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedBillingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setSelectedBillingCycle('annual')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedBillingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              Anual <span className="text-xs bg-red-500 text-white px-2 py-1 rounded ml-2">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SUBSCRIPTION_PLANS.map((plan, idx) => {
            const isCurrentPlan = user?.subscription?.planId === plan.id
            const isAnnual = selectedBillingCycle === 'annual'
            const displayPrice = isAnnual && plan.price > 0 ? Math.round(plan.price * 12 * 0.8) : plan.price

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden transition-all transform hover:scale-105 ${
                  plan.popular ? 'md:scale-110 shadow-2xl' : 'shadow-lg'
                } ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ MÁS POPULAR
                  </div>
                )}

                {/* Plan Content */}
                <div className="p-8">
                  {/* Plan Header */}
                  <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                  <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.period === 'Siempre' ? 'Plan Permanente' : `Por ${plan.period}`}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      {plan.price === 0 ? (
                        <>
                          <span className="text-5xl font-bold">Gratis</span>
                          <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                            Por siempre
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-5xl font-bold">${displayPrice.toLocaleString('es-MX')}</span>
                          <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                            {isAnnual ? '/ año' : '/ mes'}
                          </span>
                        </>
                      )}
                    </div>
                    {isAnnual && plan.price > 0 && (
                      <p className="text-xs mt-2 opacity-75">
                        ${(displayPrice / 12).toLocaleString('es-MX')} monthly
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  {isCurrentPlan ? (
                    <button
                      disabled
                      className={`w-full py-3 rounded-lg font-bold mb-8 ${
                        plan.popular
                          ? 'bg-blue-100 text-blue-600 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      ✓ Plan Actual
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      className={`w-full py-3 rounded-lg font-bold mb-8 transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-white text-blue-600 hover:bg-blue-50'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Contratar Ahora <FiArrowRight />
                    </button>
                  )}

                  {/* Features */}
                  <div className="border-t border-opacity-30 border-current pt-8">
                    <p className={`text-sm font-semibold mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-700'}`}>
                      Características:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => {
                        const isIncluded = feature.startsWith('✓')
                        return (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 text-sm ${
                              isIncluded
                                ? plan.popular
                                  ? 'text-blue-100'
                                  : 'text-gray-700'
                                : plan.popular
                                ? 'text-blue-300 opacity-60'
                                : 'text-gray-400'
                            }`}
                          >
                            <span className="flex-shrink-0 mt-0.5 text-lg">
                              {isIncluded ? '✓' : '✗'}
                            </span>
                            <span>{feature.replace(/^✓|^✗\s/, '')}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Puedo cambiar de plan?</h3>
              <p className="text-gray-600">
                Sí, puedes cambiar o actualizar tu plan en cualquier momento desde tu panel de usuario. Los cambios se aplican inmediatamente.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Hay período de prueba?</h3>
              <p className="text-gray-600">
                El plan Gratuito es permanente sin limitación de tiempo. Prueba todas las características antes de pagar.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Puedo cancelar en cualquier momento?</h3>
              <p className="text-gray-600">
                Sí, sin compromiso. Puedes cancelar tu suscripción en cualquier momento desde tu panel de configuración.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Qué métodos de pago aceptan?</h3>
              <p className="text-gray-600">
                Aceptamos tarjeta de crédito, débito, transferencia bancaria y billeteras digitales como PayPal.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg p-12 overflow-x-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Comparativa Detallada
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 font-bold text-gray-800">Característica</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800">Gratuito</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800">Básico</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800">Profesional</th>
              </tr>
            </thead>
            <tbody>
              {['Perfil', 'Galería', 'Estadísticas', 'Soporte', 'API', 'Certificado'].map((feature, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-4 font-semibold text-gray-800">{feature}</td>
                  <td className="text-center py-4 px-4">
                    {idx === 0 ? (
                      <span className="text-green-600 text-lg">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {[0, 1, 4].includes(idx) ? (
                      <span className="text-green-600 text-lg">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-600 text-lg">✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Listo para crecer?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a miles de profesionales y negocios en SmartWorks
          </p>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 px-12 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Comenzar Ahora <FiArrowRight />
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 px-12 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Ir a Mi Dashboard <FiArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Plans
