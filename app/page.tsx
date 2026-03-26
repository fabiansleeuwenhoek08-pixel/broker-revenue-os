import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: leads } = await supabase
    .from('seller_leads')
    .select('*')
    .order('created_at', { ascending: false })

  const totalLeads = leads?.length || 0

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Broker Revenue OS</h1>
        <p className="text-gray-400 mb-8">Live dashboard van jouw leadsysteem</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Totaal Leads</p>
            <p className="text-4xl font-bold mt-2">{totalLeads}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-2xl font-semibold mt-2 text-green-400">Online</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Database</p>
            <p className="text-2xl font-semibold mt-2 text-blue-400">Supabase gekoppeld</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recente leads</h2>

          {!leads || leads.length === 0 ? (
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