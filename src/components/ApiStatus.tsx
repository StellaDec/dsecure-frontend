interface ApiStatusProps {
  loading: boolean
  isUsingApi: boolean
  error: string | null
  onRefresh: () => void
}

export default function ApiStatus({ loading, isUsingApi, error, onRefresh }: ApiStatusProps) {
  return (
    <div className="flex items-center space-x-4">
      {/* API Status Indicator */}
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
        loading ? 'bg-[#d4ede4] text-[#0a2e1e]' :
        isUsingApi ? 'bg-[#d4ede4] text-[#0a2e1e]' : 'bg-[#d4ede4] text-[#0a2e1e]'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          loading ? 'bg-[#0e7c66]' :
          isUsingApi ? 'bg-[#0e7c66]' : 'bg-[#0e7c66]'
        }`}></div>
        <span>
          {loading ? 'Loading...' : 
           isUsingApi ? 'API Connected' : 'Default Data'}
        </span>
      </div>
      
      {error && (
        <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
          API Error: Using fallback data
        </div>
      )}
      
      <button 
        onClick={onRefresh}
        className="text-xs text-slate-600 hover:text-slate-800 bg-white px-3 py-1 rounded border hover:bg-slate-50 transition-colors"
      >
        Refresh
      </button>
    </div>
  )
}
