import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Project, ProjectFormData } from '../types'

export const useProjects = () => {
  const { data: session } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [projectForm, setProjectForm] = useState<ProjectFormData>({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    image: null,
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${session?.token}` },
      })
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      setError('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (typeof projectForm.techStack === 'string') {
      projectForm.techStack = projectForm.techStack
        .split(',')
        .map((tech: string) => tech.trim())
    }

    const formData = new FormData()
    formData.append('title', projectForm.title)
    formData.append('description', projectForm.description)
    formData.append('techStack', JSON.stringify(projectForm.techStack)) // Now it's an array
    formData.append('githubUrl', projectForm.githubUrl)
    formData.append('liveUrl', projectForm.liveUrl)
    if (projectForm.image) {
      formData.append('image', projectForm.image)
    }

    try {
      const url = editingProject
        ? `http://localhost:5000/api/projects/${editingProject._id}`
        : 'http://localhost:5000/api/projects'
      const method = editingProject ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${session?.token}` },
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save project')
      }

      await fetchProjects()
      setProjectForm({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        image: null,
      })
      setEditingProject(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.token}` },
      })

      if (!res.ok) throw new Error('Failed to delete project')
      await fetchProjects()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: null,
    })
  }

  return {
    projects,
    projectForm,
    editingProject,
    loading,
    error,
    fetchProjects,
    handleProjectSubmit,
    handleDeleteProject,
    handleEditProject,
    setProjectForm,
    setEditingProject,
  }
}
