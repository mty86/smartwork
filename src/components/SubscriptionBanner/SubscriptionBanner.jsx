import { useNavigate } from 'react-router-dom'
import { FiAward, FiArrowRight } from 'react-icons/fi'
import { SUBSCRIPTION_PLANS } from '../../utils/constants'

export const SubscriptionBanner = ({ user }) => {
  const navigate = useNavigate()
  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === user?.subscription?.planId) || SUBSCRIPTION_PLANS[0]

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {currentPlan.id === 1 ? '🆓' : currentPlan.id === 2 ? '⭐' : '👑'}
          </div>
          <div>
            <p className="text-sm text-blue-100">Plan Actual</p>
            <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
            {currentPlan.price > 0 && (
              <p className="text-blue-100 text-sm">
                ${currentPlan.price.toLocaleString('es-MX')} MXN / {currentPlan.period}
              </p>
            )}
          </div>
        </div>

        {currentPlan.id !== 3 && (
          <button
            onClick={() => navigate('/plans')}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            <FiAward /> Mejorar Plan <FiArrowRight />
          </button>
        )}
      </div>

      {currentPlan.id !== 3 && (
        <div className="mt-4 text-blue-100 text-sm">
          {currentPlan.id === 1 && '✨ Contrata un plan pago para acceder a características avanzadas'}
          {currentPlan.id === 2 && '🚀 Actualiza a Profesional para obtener el máximo rendimiento'}
        </div>
      )}
    </div>
  )
}

export default SubscriptionBanner
