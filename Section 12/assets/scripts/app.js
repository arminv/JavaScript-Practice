class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectSwitchButton() {}
  connectMoreInfoButton() {
    const ProjectItemElement = document.getElementById(this.id);
    const switchBtn = ProjectItemElement.querySelector('button:last-of-type');
    switchBtn.addEventListener('click');
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id));
    }
    console.log(this.projects);
  }

  addProject() {}

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    // NOTE: this is easier than above:
    this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
  }
}

App.init();
