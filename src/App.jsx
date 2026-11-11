import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bookmark,
  Compass,
  FolderOpen,
  Heart,
  Home,
  Library,
  MoonStar,
  Palette,
  Plus,
  Search,
  Sparkles,
  SunMedium,
  User2,
} from 'lucide-react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'

const categoryData = [
  {
    id: 'vintage',
    name: 'Vintage Aesthetics',
    image:
      'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'fashion',
    name: 'Fashion & Styling',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'photography',
    name: 'Photography',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'interiors',
    name: 'Interior Design',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'typography',
    name: 'Typography',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'art',
    name: 'Art & Illustration',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'branding',
    name: 'Branding',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'film',
    name: 'Film & Cinema',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  },
]

const moodboards = [
  {
    id: 'serene-vintage',
    title: 'The Serene Vintage Vibe',
    creator: 'Lina Verdi',
    count: 42,
    category: 'Vintage Aesthetics',
    description: 'Muted florals, textured paper, and a slow afternoon palette with warm stone tones.',
    cover:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F1EDE3', '#DCC7B4', '#7C6A5D', '#733E49'],
    notes: ['Flora studies', 'Soft linen', 'Old postcards'],
  },
  {
    id: 'mediterranean-summer',
    title: 'Mediterranean Summer',
    creator: 'Ari Sol',
    count: 26,
    category: 'Photography',
    description: 'Sea-washed colours, coral architecture and the glow of a sunlit afternoon.',
    cover:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F7D8BA', '#F3A96A', '#A86B54', '#3A5D63'],
    notes: ['Coastal motion', 'Sun-baked walls', 'Glass reflections'],
  },
  {
    id: 'film-photo-diaries',
    title: 'Film Photography Diaries',
    creator: 'Nora Vale',
    count: 34,
    category: 'Film & Cinema',
    description: 'Light leaks and tactile grain for a documentary, nostalgic mood.',
    cover:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    palette: ['#D2B59C', '#5E5A54', '#E3D5C7', '#C3754A'],
    notes: ['Grain textures', 'Candid portraits', 'Golden hour'],
  },
  {
    id: 'art-of-minimalism',
    title: 'The Art of Minimalism',
    creator: 'Milo Hart',
    count: 18,
    category: 'Art & Illustration',
    description: 'Sharp lines, gallery walls, and material honesty in simple compositions.',
    cover:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    palette: ['#EAE5DD', '#B4AB9E', '#1F1E1A', '#6F4F3C'],
    notes: ['Monolith forms', 'Quiet contrast', 'Museum palette'],
  },
  {
    id: 'renaissance-reimagined',
    title: 'Renaissance Reimagined',
    creator: 'Clara Baines',
    count: 29,
    category: 'Art & Illustration',
    description: 'Classical forms revisited through contemporary editorial framing and motion.',
    cover:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    palette: ['#E8D4AA', '#6D4B3A', '#A9A08E', '#2C2C2B'],
    notes: ['Louvre studies', 'Velvet accents', 'Portrait light'],
  },
  {
    id: 'soft-editorial',
    title: 'Soft Editorial Aesthetics',
    creator: 'Iris Nox',
    count: 52,
    category: 'Fashion & Styling',
    description: 'Luxury layering, tactile neutrals, and thoughtful silhouettes with a soft editorial edge.',
    cover:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    palette: ['#F8F3ED', '#D8C2A8', '#A78D74', '#5A514A'],
    notes: ['Textured knits', 'Fitted tailoring', 'Soft contrast'],
  },
  {
    id: 'midnight-paris',
    title: 'Midnight in Paris',
    creator: 'Noah Elise',
    count: 23,
    category: 'Architecture',
    description: 'Paris after dusk with stone facades, street lamps, and a moody reflective mood.',
    cover:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    palette: ['#D8C7B3', '#5B4A45', '#B58A5C', '#1D242B'],
    notes: ['Cobbled streets', 'Warm gold glows', 'Gilded details'],
  },
  {
    id: 'earthy-interiors',
    title: 'Earthy Interiors',
    creator: 'Saffron Chen',
    count: 40,
    category: 'Interior Design',
    description: 'Linen textures, clay finishes, and an intimate mix of heritage and minimalism.',
    cover:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    palette: ['#E5D8C8', '#A38F75', '#816B57', '#3F3E39'],
    notes: ['Natural fibres', 'Stone surfaces', 'Warm shadows'],
  },
]

const studioProjects = [
  {
    id: 'reverie-collection',
    title: 'Reverie Collection',
    status: 'Moodboard in progress',
    progress: 72,
    images: 18,
    accent: '#733E49',
  },
  {
    id: 'atelier-essays',
    title: 'Atelier Essays',
    status: 'Layouts refined',
    progress: 84,
    images: 12,
    accent: '#777C59',
  },
  {
    id: 'olive-harbor',
    title: 'Olive Harbor Brand',
    status: 'References locked',
    progress: 61,
    images: 9,
    accent: '#B78D50',
  },
]

const navigation = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Explore', to: '/explore', icon: Compass },
  { label: 'My Studio', to: '/studio', icon: Library },
  { label: 'Saved', to: '/saved', icon: Bookmark },
  { label: 'Profile', to: '/profile', icon: User2 },
]

const defaultSaved = ['soft-editorial', 'earthy-interiors']

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('frameit-theme')
    return saved || 'light'
  } catch {
    return 'light'
  }
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('frameit-saved')
      return saved ? JSON.parse(saved) : defaultSaved
    } catch {
      return defaultSaved
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('frameit-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('frameit-saved', JSON.stringify(savedIds))
  }, [savedIds])

  const toggleSave = (id) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const savedMoodboards = useMemo(
    () => moodboards.filter((board) => savedIds.includes(board.id)),
    [savedIds],
  )

  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar-shell">
          <div className="brand-mark">
            <span>F</span>
          </div>
          <nav className="sidebar-nav" aria-label="Main navigation">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink key={label} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
          </button>
        </aside>

        <main className="content-shell">
          <Routes>
            <Route path="/" element={<HomePage savedIds={savedIds} toggleSave={toggleSave} />} />
            <Route
              path="/explore"
              element={<ExplorePage savedIds={savedIds} toggleSave={toggleSave} />}
            />
            <Route path="/studio" element={<StudioPage />} />
            <Route
              path="/saved"
              element={<SavedPage savedMoodboards={savedMoodboards} toggleSave={toggleSave} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/board/:boardId" element={<BoardDetailPage savedIds={savedIds} toggleSave={toggleSave} />} />
          </Routes>
        </main>

        <aside className="context-shell">
          <div className="context-panel">
            <p className="eyebrow">Current focus</p>
            <h3>Gallery Notes</h3>
            <div className="mini-card">
              <span className="dot accent" />
              <div>
                <strong>Golden hour</strong>
                <small>Warm light study</small>
              </div>
            </div>
            <div className="mini-card">
              <span className="dot olive" />
              <div>
                <strong>Botanical references</strong>
                <small>Pressed florals</small>
              </div>
            </div>
            <div className="mini-card">
              <span className="dot gold" />
              <div>
                <strong>Paper textures</strong>
                <small>Editorial collage</small>
              </div>
            </div>
          </div>

          <div className="context-panel">
            <p className="eyebrow">Palette</p>
            <h3>Gallery tones</h3>
            <div className="palette-row">
              {['#F1EDE3', '#733E49', '#777C59', '#B78D50', '#211F1C'].map((color) => (
                <span key={color} className="swatch" style={{ background: color }} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </BrowserRouter>
  )
}

function HomePage({ savedIds, toggleSave }) {
  return (
    <div className="page-stack">
      <section className="hero-panel editorial-card">
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=80"
            alt="Elegant gallery interior"
          />
        </div>
        <div className="hero-copy">
          <span className="eyebrow">Creative journal</span>
          <h1>Your world of creative inspiration.</h1>
          <p>
            Discover ideas, collect references and turn scattered inspiration into something beautiful.
          </p>
          <div className="cta-row">
            <Link to="/studio" className="primary-btn">
              Start Creating
              <ArrowUpRight size={17} />
            </Link>
            <Link to="/explore" className="secondary-btn">
              Explore Inspiration
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">Curated collection</p>
            <h2>Curated for your creative eye</h2>
          </div>
        </div>

        <div className="category-grid">
          {categoryData.map((category) => (
            <Link key={category.id} to="/explore" className="category-card" state={{ filter: category.id }}>
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">Trending boards</p>
            <h2>Trending Moodboards</h2>
          </div>
          <Link to="/explore" className="inline-link">
            View all <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="moodboard-grid">
          {moodboards.map((board) => {
            const isSaved = savedIds.includes(board.id)
            return (
              <article key={board.id} className="board-card">
                <Link to={`/board/${board.id}`} className="board-cover">
                  <img src={board.cover} alt={board.title} />
                </Link>
                <div className="board-meta">
                  <div>
                    <p className="meta-category">{board.category}</p>
                    <Link to={`/board/${board.id}`} className="board-title-link">
                      {board.title}
                    </Link>
                  </div>
                  <button type="button" className={`save-btn ${isSaved ? 'saved' : ''}`} onClick={() => toggleSave(board.id)} aria-label={`Save ${board.title}`}>
                    <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="board-footer">
                  <span>{board.creator}</span>
                  <strong>{board.count} images</strong>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function ExplorePage({ savedIds, toggleSave }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const location = useLocation()

  useEffect(() => {
    if (location.state?.filter) {
      setSelectedCategory(location.state.filter)
    }
  }, [location.state])

  const filteredBoards = useMemo(() => {
    return moodboards.filter((board) => {
      const matchesSearch =
        search.length === 0 ||
        board.title.toLowerCase().includes(search.toLowerCase()) ||
        board.creator.toLowerCase().includes(search.toLowerCase()) ||
        board.category.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || board.category.toLowerCase().includes(selectedCategory.toLowerCase())

      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  return (
    <div className="page-stack explore-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inspiration library</p>
          <h2>Find your next inspiration.</h2>
        </div>
      </header>

      <div className="search-bar">
        <Search size={18} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search moodboards, creators, and categories"
        />
      </div>

      <div className="filter-row">
        <button type="button" className={`chip ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>
          All
        </button>
        {categoryData.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`chip ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="moodboard-grid compact-grid">
        {filteredBoards.map((board) => {
          const isSaved = savedIds.includes(board.id)
          return (
            <article key={board.id} className="board-card explore-card">
              <Link to={`/board/${board.id}`} className="board-cover">
                <img src={board.cover} alt={board.title} />
              </Link>
              <div className="board-meta">
                <div>
                  <p className="meta-category">{board.category}</p>
                  <Link to={`/board/${board.id}`} className="board-title-link">{board.title}</Link>
                </div>
                <button type="button" className={`save-btn ${isSaved ? 'saved' : ''}`} onClick={() => toggleSave(board.id)} aria-label={`Save ${board.title}`}>
                  <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function StudioPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Your studio</p>
          <h2>My Studio</h2>
        </div>
        <button type="button" className="primary-btn small-btn">
          <Plus size={16} />
          New Project
        </button>
      </header>

      <div className="studio-grid">
        {studioProjects.map((project) => (
          <article key={project.id} className="studio-card editorial-card">
            <div className="studio-header">
              <div>
                <p className="eyebrow">Collection</p>
                <h3>{project.title}</h3>
              </div>
              <Palette size={18} />
            </div>
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${project.progress}%`, background: project.accent }} />
            </div>
            <div className="studio-meta">
              <span>{project.status}</span>
              <strong>{project.progress}%</strong>
            </div>
            <div className="studio-footer">
              <span>{project.images} references</span>
              <Link to="/explore" className="inline-link">
                Open board <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function SavedPage({ savedMoodboards, toggleSave }) {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Collections</p>
          <h2>Saved inspiration</h2>
        </div>
      </header>

      {savedMoodboards.length === 0 ? (
        <div className="empty-card editorial-card">
          <FolderOpen size={28} />
          <h3>No saved boards yet</h3>
          <p>Save the moodboards you love and revisit them here.</p>
          <Link to="/explore" className="secondary-btn">Discover more</Link>
        </div>
      ) : (
        <div className="moodboard-grid">
          {savedMoodboards.map((board) => (
            <article key={board.id} className="board-card">
              <Link to={`/board/${board.id}`} className="board-cover">
                <img src={board.cover} alt={board.title} />
              </Link>
              <div className="board-meta">
                <div>
                  <p className="meta-category">{board.category}</p>
                  <Link to={`/board/${board.id}`} className="board-title-link">{board.title}</Link>
                </div>
                <button type="button" className="save-btn saved" onClick={() => toggleSave(board.id)} aria-label={`Remove ${board.title}`}>
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="page-stack profile-page">
      <header className="profile-hero editorial-card">
        <div className="avatar">AV</div>
        <div>
          <p className="eyebrow">Creative profile</p>
          <h2>Amelia Hart</h2>
          <p className="profile-bio">Visual storyteller exploring editorial interiors, floral narratives, and warm archival palettes.</p>
        </div>
      </header>

      <div className="profile-stats">
        <div className="stat-card editorial-card">
          <span>Boards</span>
          <strong>24</strong>
        </div>
        <div className="stat-card editorial-card">
          <span>Saved</span>
          <strong>18</strong>
        </div>
        <div className="stat-card editorial-card">
          <span>Collections</span>
          <strong>06</strong>
        </div>
      </div>
    </div>
  )
}

function BoardDetailPage({ savedIds, toggleSave }) {
  const { boardId } = useParams()
  const board = moodboards.find((item) => item.id === boardId) || moodboards[0]
  const isSaved = savedIds.includes(board.id)

  return (
    <div className="page-stack detail-page">
      <header className="detail-header">
        <div>
          <p className="eyebrow">{board.category}</p>
          <h2>{board.title}</h2>
        </div>
        <button type="button" className={`save-btn large ${isSaved ? 'saved' : ''}`} onClick={() => toggleSave(board.id)}>
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </header>

      <div className="detail-feature editorial-card">
        <img src={board.cover} alt={board.title} />
      </div>

      <div className="detail-grid">
        <div className="detail-copy editorial-card">
          <p className="eyebrow">Curator</p>
          <h3>{board.creator}</h3>
          <p>{board.description}</p>
          <ul className="note-list">
            {board.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="detail-palette editorial-card">
          <p className="eyebrow">Palette</p>
          <div className="palette-stack">
            {board.palette.map((color) => (
              <div key={color} className="palette-swatch" style={{ background: color }}>
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
