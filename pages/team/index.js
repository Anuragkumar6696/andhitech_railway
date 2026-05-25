import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import TeamCard from '@/components/Team/TeamCard'
import Head from 'next/head'

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team/`)
    const data = await res.json()
    const results = (data.results || []).map((member) => ({
      ...member,
      social: {
        twitter: member.twitter,
        facebook: member.facebook,
        instagram: member.instagram,
        pinterest: member.pinterest,
      },
    }))

    return {
      props: {
        teamData: results,
      },
    }
  } catch (error) {
    console.error('Error fetching team data:', error)
    return {
      props: {
        teamData: [],
      },
    }
  }
}

export default function TeamPage({ teamData }) {
  return (
    <>
    <Head>
  <title>Our Team</title>
  <meta name="description" content="Meet our dedicated team members." />
</Head>
      <Header />
      <PageBanner title="Our Team" backgroundImage="/images/page-header-bg.jpg" currentPage="Team" />

      <div className="page-team">
        <div className="container">
          <div className="row">
            {teamData.length === 0 ? (
              <div className="text-center col-12">No team members found.</div>
            ) : (
              teamData.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
