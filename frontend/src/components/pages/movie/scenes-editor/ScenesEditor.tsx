import * as React from 'react'
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  Position,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'react-flow-renderer'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Button } from '@material-ui/core'
import styles from './styles.styl'
import { SceneNode } from './scene-node/SceneNode'
import { SceneEditForm } from './scene-edit/SceneEditForm'
import withPageInfo from 'root/store/page/pageinfo'
import { useAppSelector } from 'root/store/application.store'
import { Loader } from 'components/Loader'
import {
  addConnection,
  addScene,
  deleteConnection,
  deleteScene,
  getProject,
  updateSceneCoordinates
} from 'root/store/movie/project/project.actions'
import { PageInfoProps } from 'root/store/page/page.types'
import './styles.css'
import { appRoutes } from 'root/appRoutes'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'

export interface ScenesEditorRouteProps {
  movieId: string
}

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      )
    },
    position: { x: 250, y: 0 }
  },
  {
    id: '2',
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      )
    },
    position: { x: 100, y: 100 }
  },
  {
    id: '3',
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      )
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180
    }
  },
  {
    id: '4',
    position: { x: 250, y: 200 },
    data: {
      label: 'Another default node'
    }
  },
  {
    id: '5',
    data: {
      label: 'Node id: 5'
    },
    position: { x: 250, y: 325 }
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: (
        <>
          An <strong>output node</strong>
        </>
      )
    },
    position: { x: 100, y: 480 }
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Another output node' },
    position: { x: 400, y: 450 }
  }
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3' },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'animated edge'
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: 'edge with arrow head',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: 'smooth step edge'
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    label: 'a step edge',
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 }
  }
]

export type ScenesEditorProps = RouteComponentProps<ScenesEditorRouteProps> & PageInfoProps

const ScenesEditorComponent: React.FC<ScenesEditorProps> = props => {
  const project = useAppSelector(state => state.project.value)
  const projectId = props.match.params.movieId
  const dispatch = useDispatch()

  const addScenePending = useAppSelector(state => state.project.addScenePending)

  useEffect(() => {
    if (projectId && !project) dispatch(getProject.request(projectId))

    if (project) {
      props.setPageInfo({
        title: `Редактор сцен: ${project.name}`,
        headerTitle: (
          <>
            Редактор сцен: <span style={{ textTransform: 'none' }}>{project.name}</span>
          </>
        )
      })
    }
  }, [projectId, project])

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    const projectNodes: Node[] =
      project?.nodes.map(node => ({
        id: node.id,
        position: { x: node.x ?? 0, y: node.y ?? 0 },
        data: {
          label: <SceneNode isBeginning={node.isBeginning} scene={node} />
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right
      })) ?? []

    const projectConnections: Edge[] =
      project?.nodes.flatMap(
        node =>
          node.parentGuids?.flatMap(parent => ({
            id: `${parent}_${node.id}`,
            source: parent,
            label: node.buttonName,
            target: node.id,
            markerEnd: {
              type: MarkerType.ArrowClosed
            }
          })) ?? []
      ) ?? []

    setNodes(projectNodes)
    setEdges(projectConnections)
  }, [project?.nodes])

  const nodeDragEndHandler = (_event, node: Node): void => {
    dispatch(
      updateSceneCoordinates.request({
        id: node.id,
        x: Math.trunc(node.position.x),
        y: Math.trunc(node.position.y)
      })
    )
  }

  if (!project) return <Loader />

  return (
    <div className={styles.flowchart}>
      <div className={styles.header}>
        <GradientButton
          size='small'
          disabled={addScenePending}
          onClick={() => {
            dispatch(addScene.request(projectId))
          }}
        >
          Добавить сцену +
        </GradientButton>
        <Button
          variant='raised'
          onClick={() => {
            window.open(appRoutes.movie(projectId))
          }}
        >
          Предварительный просмотр
        </Button>
      </div>
      <SceneEditForm />
      <ReactFlow
        className={styles.flowchartContent}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeDragStop={nodeDragEndHandler}
        onNodesDelete={nodes => nodes.map(node => dispatch(deleteScene.request(node.id)))}
        onEdgesChange={onEdgesChange}
        onConnect={connection => {
          setEdges(addEdge(connection, edges))
          dispatch(
            addConnection.request({
              fromId: connection.source ?? '',
              toId: connection.target ?? ''
            })
          )
        }}
        onEdgesDelete={edges => {
          edges.map(connection =>
            dispatch(
              deleteConnection.request({
                fromId: connection.source,
                toId: connection.target
              })
            )
          )
          setEdges(edges.filter(connection => !edges.includes(connection)))
        }}
        fitView
        fitViewOptions={{
          padding: 0.2
        }}
      />
    </div>
  )
}

export const ScenesEditor = withRouter(withPageInfo(ScenesEditorComponent))
