import { supabase } from '@/lib/supabase'

export default async function Home() {
  let leads: Record<string, string>[] | null = null
  let errorMessage: string | null = null

  try {
    const { data, error } = await supabase
      .from('seller_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      errorMessage = error.message
    } else {
      leads = data
    }
  } catch {
    errorMessage = 'Kan geen verbinding maken met de database. Probeer het later opnieuw.'
  }

  const totalLeads = leads?.length || 0

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Broker Revenue OS</h1>
        <p className="text-gray-400 mb-8">Live dashboard van jouw leadsysteem</p>

        {errorMessage && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-6 mb-8">
            <p className="text-red-300 font-semibold">Er is een fout opgetreden</p>
            <p className="text-red-400 text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Totaal Leads</p>
            <p className="text-4xl font-bold mt-2">{totalLeads}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Status</p>
            {errorMessage ? (
              <p className="text-2xl font-semibold mt-2 text-red-400">Fout</p>
            ) : (
              <p className="text-2xl font-semibold mt-2 text-green-400">Online</p>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Database</p>
            {errorMessage ? (
              <p className="text-2xl font-semibold mt-2 text-red-400">Niet verbonden</p>
            ) : (
              <p className="text-2xl font-semibold mt-2 text-blue-400">Supabase gekoppeld</p>
            )}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recente leads</h2>

          {errorMessage ? (
            <p className="text-gray-400">Leads kunnen niet worden geladen vanwege een fout.</p>
          ) : !leads || leads.length === 0 ? (
            <p className="text-gray-400">Nog geen leads gevonden.</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 10).map((lead) => (
                <div
                  key={lead.id}
                  className="border border-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="font-medium">{lead.full_name || 'Geen naam'}</p>
                    <p className="text-gray-400 text-sm">
                      {lead.street_address || 'Geen adres'} , {lead.city || 'Geen stad'}
                    </p>
                  </div>
                  <div className="text-sm text-gray-300">
                    {lead.source || 'Geen bron'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
