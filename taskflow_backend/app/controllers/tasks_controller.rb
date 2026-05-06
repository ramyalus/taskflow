class TasksController < ApplicationController
  before_action :set_task, only: [:update, :destroy]

  def index
    render json: Task.all
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  def update
    @task.update(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.permit(:title, :description, :status, :user_id)
  end
end
