/* eslint-disable import/no-extraneous-dependencies */
import { Colors, Icons, InitialData } from 'src/Isoflow';
import { flattenCollections } from '@isoflow/isopacks/dist/utils';
import isoflowIsopack from '@isoflow/isopacks/dist/isoflow';
import awsIsopack from '@isoflow/isopacks/dist/aws';
import kubernetesIsopack from '@isoflow/isopacks/dist/kubernetes';

const isopacks = flattenCollections([
  isoflowIsopack,
  awsIsopack,
  kubernetesIsopack
]);

export const colors: Colors = [
  {
    id: 'color1',
    value: '#a5b8f3'
  },
  {
    id: 'color2',
    value: '#bbadfb'
  },
  {
    id: 'color3',
    value: '#f4eb8e'
  },
  {
    id: 'color4',
    value: '#a8dc9d'
  }
];

export const icons: Icons = isopacks;

export const layeredArchitectureData: InitialData = {
  title: 'Multi-Layer Architecture Example',
  icons,
  colors,
  items: [
    // Infrastructure Layer Items
    {
      id: 'vpc',
      name: 'VPC',
      icon: 'aws/network/vpc',
      description:
        '<p>Virtual Private Cloud providing network isolation for the infrastructure</p>'
    },
    {
      id: 'rds',
      name: 'RDS Database',
      icon: 'aws/database/rds',
      description: '<p>Managed relational database service</p>'
    },
    {
      id: 's3',
      name: 'S3 Storage',
      icon: 'aws/storage/s3-bucket',
      description: '<p>Object storage for application assets</p>'
    },
    // Platform Layer Items
    {
      id: 'k8s-cluster',
      name: 'Kubernetes Cluster',
      icon: 'kubernetes/infrastructure/kubernetes',
      description: '<p>Container orchestration platform</p>'
    },
    {
      id: 'ingress',
      name: 'Ingress Controller',
      icon: 'kubernetes/network/ingress',
      description: '<p>Route external traffic to services</p>'
    },
    // Application Layer Items
    {
      id: 'api-service',
      name: 'API Service',
      icon: 'kubernetes/workloads/deployment',
      description: '<p>RESTful API backend service</p>'
    },
    {
      id: 'web-app',
      name: 'Web Application',
      icon: 'kubernetes/workloads/deployment',
      description: '<p>Frontend web application</p>'
    },
    {
      id: 'worker',
      name: 'Background Worker',
      icon: 'kubernetes/workloads/job',
      description: '<p>Processes background jobs</p>'
    }
  ],
  views: [
    {
      id: 'layered-view',
      name: 'Layered Architecture View',
      description:
        'Demonstrates multiple layers: Infrastructure, Platform, and Application',
      items: [],
      layers: [
        {
          id: 'infrastructure-layer',
          name: 'Infrastructure Layer',
          description: 'AWS infrastructure components',
          zOffset: 0,
          visible: true,
          transparency: 1,
          items: [
            {
              id: 'vpc',
              tile: { x: 0, y: 0 },
              labelHeight: 80
            },
            {
              id: 'rds',
              tile: { x: -3, y: 2 },
              labelHeight: 80
            },
            {
              id: 's3',
              tile: { x: 3, y: 2 },
              labelHeight: 80
            }
          ]
        },
        {
          id: 'platform-layer',
          name: 'Platform as a Service Layer',
          description: 'Kubernetes platform running on infrastructure',
          zOffset: 3,
          visible: true,
          transparency: 1,
          items: [
            {
              id: 'k8s-cluster',
              tile: { x: 0, y: 0 },
              labelHeight: 80
            },
            {
              id: 'ingress',
              tile: { x: 0, y: -3 },
              labelHeight: 80
            }
          ]
        },
        {
          id: 'application-layer',
          name: 'Application Layer',
          description: 'Application services deployed on the platform',
          zOffset: 6,
          visible: true,
          transparency: 1,
          items: [
            {
              id: 'web-app',
              tile: { x: -2, y: 0 },
              labelHeight: 80
            },
            {
              id: 'api-service',
              tile: { x: 0, y: 0 },
              labelHeight: 80
            },
            {
              id: 'worker',
              tile: { x: 2, y: 0 },
              labelHeight: 80
            }
          ]
        }
      ],
      connectors: [
        {
          id: 'web-to-api',
          color: 'color1',
          anchors: [
            {
              id: 'web-anchor',
              ref: { item: 'web-app' }
            },
            {
              id: 'api-anchor',
              ref: { item: 'api-service' }
            }
          ],
          width: 10,
          description: 'Web app calls API',
          style: 'SOLID'
        },
        {
          id: 'api-to-worker',
          color: 'color2',
          anchors: [
            {
              id: 'api-anchor-2',
              ref: { item: 'api-service' }
            },
            {
              id: 'worker-anchor',
              ref: { item: 'worker' }
            }
          ],
          width: 10,
          description: 'API queues jobs for worker',
          style: 'SOLID'
        }
      ],
      rectangles: [
        {
          id: 'infra-box',
          color: 'color1',
          from: { x: -4, y: -2 },
          to: { x: 4, y: 4 }
        },
        {
          id: 'platform-box',
          color: 'color2',
          from: { x: -2, y: 1 },
          to: { x: 2, y: 5 }
        },
        {
          id: 'app-box',
          color: 'color3',
          from: { x: -3, y: 5 },
          to: { x: 3, y: 7 }
        }
      ],
      textBoxes: [
        {
          id: 'infra-label',
          tile: { x: -5, y: 0 },
          orientation: 'X',
          fontSize: 0.6,
          content: 'Infrastructure'
        },
        {
          id: 'platform-label',
          tile: { x: -3, y: 3 },
          orientation: 'X',
          fontSize: 0.6,
          content: 'Platform'
        },
        {
          id: 'app-label',
          tile: { x: -4, y: 6 },
          orientation: 'X',
          fontSize: 0.6,
          content: 'Applications'
        }
      ]
    }
  ]
};
