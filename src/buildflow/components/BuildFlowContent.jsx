import BidsPanel from "./BidsPanel"
import ChangeOrdersPanel from "./ChangeOrdersPanel"
import Dashboard from "./Dashboard"
import LineBotPanel from "./LineBotPanel"
import ProjectDetailPanel from "./ProjectDetailPanel"
import ProjectsPanel from "./ProjectsPanel"
import QuoteDraftsPanel from "./QuoteDraftsPanel"
import SubcontractsPanel from "./SubcontractsPanel"
import TasksPanel, { WorkerPanel } from "./TasksPanel"
import UsersPanel from "./UsersPanel"
import VendorsPanel from "./VendorsPanel"

function BuildFlowContent({
  activeTab,
  activeProject,
  bids,
  changeOrders,
  isAdmin,
  isWorker,
  metrics,
  projects,
  quoteDrafts,
  session,
  subcontracts,
  tasks,
  users,
  vendors,
  workerTasks,
  actions,
}) {
  return (
    <section className="min-w-0">
      {activeTab === "dashboard" && isAdmin && (
        <Dashboard
          metrics={metrics}
          projects={projects}
          changeOrders={changeOrders}
          tasks={tasks}
          openProjectDetail={actions.openProjectDetail}
          goToTab={actions.goToTab}
        />
      )}

      {activeTab === "projects" && isAdmin && (
        <ProjectsPanel
          projects={projects}
          addProject={actions.addProject}
          editProject={actions.editProject}
          deleteProject={actions.deleteProject}
          updateProjectStatus={actions.updateProjectStatus}
          openProjectDetail={actions.openProjectDetail}
        />
      )}

      {activeTab === "quoteDrafts" && isAdmin && (
        <QuoteDraftsPanel
          quoteDrafts={quoteDrafts}
          addQuoteDraft={actions.addQuoteDraft}
          updateQuoteDraftStage={actions.updateQuoteDraftStage}
          updateQuoteOwnerStatus={actions.updateQuoteOwnerStatus}
          createProjectFromQuoteDraft={actions.createProjectFromQuoteDraft}
          printQuoteDraftPdf={actions.printQuoteDraftPdf}
        />
      )}

      {activeTab === "projectDetail" && isAdmin && (
        <ProjectDetailPanel
          project={activeProject}
          subcontracts={subcontracts}
          bids={bids}
          changeOrders={changeOrders}
          tasks={tasks}
          updateProjectStatus={actions.updateProjectStatus}
          updateSubcontractStatus={actions.updateSubcontractStatus}
          updateChangeStatus={actions.updateChangeStatus}
          toggleTaskComplete={actions.toggleTaskComplete}
          updateTaskReport={actions.updateTaskReport}
          generateConfirmText={actions.generateConfirmText}
          onBack={actions.closeProjectDetail}
        />
      )}

      {activeTab === "subcontracts" && isAdmin && (
        <SubcontractsPanel
          projects={projects}
          users={users}
          subcontracts={subcontracts}
          addSubcontract={actions.addSubcontract}
          editSubcontract={actions.editSubcontract}
          deleteSubcontract={actions.deleteSubcontract}
          updateSubcontractStatus={actions.updateSubcontractStatus}
          openProjectDetail={actions.openProjectDetail}
        />
      )}

      {activeTab === "bids" && isAdmin && (
        <BidsPanel
          bids={bids}
          subcontracts={subcontracts}
          addBid={actions.addBid}
          deleteBid={actions.deleteBid}
          selectBid={actions.selectBid}
        />
      )}

      {activeTab === "changes" && isAdmin && (
        <ChangeOrdersPanel
          projects={projects}
          changeOrders={changeOrders}
          addChangeOrder={actions.addChangeOrder}
          editChangeOrder={actions.editChangeOrder}
          deleteChangeOrder={actions.deleteChangeOrder}
          updateChangeStatus={actions.updateChangeStatus}
          generateConfirmText={actions.generateConfirmText}
        />
      )}

      {activeTab === "vendors" && isAdmin && (
        <VendorsPanel
          vendors={vendors}
          addVendor={actions.addVendor}
          editVendor={actions.editVendor}
          deleteVendor={actions.deleteVendor}
        />
      )}

      {activeTab === "users" && isAdmin && (
        <UsersPanel
          users={users}
          tasks={tasks}
          subcontracts={subcontracts}
          currentUserId={session.id}
          addUser={actions.addUser}
          editUser={actions.editUser}
          deleteUser={actions.deleteUser}
        />
      )}

      {activeTab === "tasks" && isAdmin && (
        <TasksPanel
          tasks={tasks}
          toggleTaskComplete={actions.toggleTaskComplete}
          updateTaskReport={actions.updateTaskReport}
          deleteTask={actions.deleteTask}
        />
      )}

      {activeTab === "worker" && isWorker && (
        <WorkerPanel
          worker={session}
          tasks={workerTasks}
          toggleTaskComplete={actions.toggleTaskComplete}
          updateTaskReport={actions.updateTaskReport}
        />
      )}

      {activeTab === "linebot" && (
        <LineBotPanel
          vendors={vendors}
          changeOrders={isAdmin ? changeOrders : []}
          tasks={isAdmin ? tasks : workerTasks}
          session={session}
        />
      )}
    </section>
  )
}

export default BuildFlowContent
