import React, { useState } from 'react';
import styled from 'styled-components';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  PaperClipOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  display: flex;
  gap: 2rem;
`;

const MainContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const Header = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const ProjectTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

const ProjectSubtitle = styled.p`
  color: #888;
  margin: 0.25rem 0 0 0;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 1rem;
  width: 18px;
  height: 18px;
`;

const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: #fafafa;
  margin-bottom: 0.5rem;
`;

const UploadButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #e6f7ff;
  border: 1px dashed #91d5ff;
  border-radius: 4px;
  cursor: pointer;
  color: #1890ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background-color: #d9f0ff;
  }
`;

const NoteInput = styled.textarea`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const AddNoteButton = styled.button`
  background-color: #1890ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #40a9ff;
  }
`;

// Mock Data
const requirements = [
  { id: 1, text: 'Business Plan and Financial Projections', completed: true },
  { id: 2, text: 'Certified Articles of Incorporation', completed: true },
  { id: 3, text: 'AML/CFT Policy Documentation', completed: false },
  { id: 4, text: 'Proof of Identity for all Directors', completed: false },
  { id: 5, text: 'Completed Application Form 101', completed: false },
];

const documents = [
  { id: 1, name: 'business_plan_v3_final.pdf' },
  { id: 2, name: 'articles_of_incorporation.pdf' },
];

const StartApplication = () => {
  return (
    <Container>
      <MainContent>
        <Header>
          <ProjectTitle>US Crypto Exchange License</ProjectTitle>
          <ProjectSubtitle>Jurisdiction: USA | Status: In Progress</ProjectSubtitle>
        </Header>
        <Card>
          <CardHeader>
            <CardTitle>Requirements Checklist</CardTitle>
          </CardHeader>
          {requirements.map(item => (
            <ChecklistItem key={item.id}>
              <Checkbox checked={item.completed} readOnly />
              <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.text}
              </span>
            </ChecklistItem>
          ))}
        </Card>
      </MainContent>
      <Sidebar>
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          {documents.map(doc => (
            <DocumentItem key={doc.id}>
              <span><PaperClipOutlined style={{ marginRight: '8px' }} />{doc.name}</span>
            </DocumentItem>
          ))}
          <UploadButton>
            <UploadOutlined /> Upload File
          </UploadButton>
        </Card>
        <Card style={{ marginTop: '2rem' }}>
            <CardHeader>
                <CardTitle>Activity & Notes</CardTitle>
            </CardHeader>
            <NoteInput rows="3" placeholder="Add a note..."/>
            <AddNoteButton>Add Note</AddNoteButton>
        </Card>
      </Sidebar>
    </Container>
  );
};

export default StartApplication;