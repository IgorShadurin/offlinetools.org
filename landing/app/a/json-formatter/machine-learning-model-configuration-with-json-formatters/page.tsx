import type { Metadata } from "next";
import { Settings, Brain, FileText, Code, Database } from "lucide-react"; // Using lucide-react for icons

export const metadata: Metadata = {
  title: "Machine Learning Model Configuration with JSON Formatters | Your Project",
  description:
    "Explore how JSON is used for configuring machine learning models, providing flexibility, readability, and maintainability.",
};

export default function MlModelConfigWithJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Settings className="mr-3 text-blue-600" size={32} />
        Machine Learning Model Configuration with JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          Configuring machine learning models, training processes, and data pipelines is a critical step in the ML
          development lifecycle. Effective configuration management ensures reproducibility, simplifies experimentation,
          and makes models easier to deploy and maintain. Among various formats, JSON (JavaScript Object Notation) has
          become a popular choice for specifying these configurations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-green-600" />
          Why JSON for ML Configuration?
        </h2>
        <p>JSON offers several advantages that make it suitable for ML configuration:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Human-Readable:</strong> Its structure of key-value pairs and nested objects/arrays is easy for
            developers to read and write.
          </li>
          <li>
            <strong>Machine-Parsable:</strong> JSON is simple for machines to parse and generate, making it convenient
            for software to consume and process.
          </li>
          <li>
            <strong>Language-Agnostic:</strong> Most programming languages have robust built-in or widely available
            libraries for parsing and generating JSON. This is crucial in ML environments where workflows might involve
            components written in Python, Java, Node.js, C++, etc.
          </li>
          <li>
            <strong>Structured:</strong> It naturally supports hierarchical data, which is essential for representing
            complex nested configurations like model architectures or layered training settings.
          </li>
          <li>
            <strong>Flexible:</strong> It can represent various data types (strings, numbers, booleans, arrays, objects,
            null).
          </li>
        </ul>
        <p>
          Using a standardized format like JSON separates the configuration details from the core code, leading to
          cleaner, more modular, and more maintainable projects.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Brain className="mr-2 text-purple-600" />
          Common Configuration Elements
        </h2>
        <p>A typical JSON configuration file for an ML project might include settings for:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Model Architecture:</strong> Specifying layers, units, activation functions, kernel sizes, etc.
            (especially for neural networks).
          </li>
          <li>
            <strong>Hyperparameters:</strong> Learning rate, dropout rates, regularization strengths, number of epochs,
            batch size, optimizer type and parameters, etc.
          </li>
          <li>
            <strong>Data Settings:</strong> Paths to training/validation/test data, data preprocessing steps or
            parameters (e.g., image size, normalization values), data augmentation settings.
          </li>
          <li>
            <strong>Training Process:</strong> Checkpointing frequency, logging intervals, early stopping criteria.
          </li>
          <li>
            <strong>Environment Settings:</strong> Device to use (CPU/GPU), number of workers, random seeds.
          </li>
          <li>
            <strong>Output Settings:</strong> Directory for saving models, logs, and results.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-yellow-600" />
          JSON Configuration Examples
        </h2>
        <p>Let&apos;s look at how different aspects of an ML workflow can be represented in JSON.</p>

        <h3 className="text-xl font-semibold mt-6">Example 1: Simple Model & Training Config</h3>
        <p>
          This example shows a basic configuration for a simple feedforward neural network and its training parameters.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`{
  "model": {
    "type": "FeedForward",
    "input_dim": 784,
    "layers": [
      {"type": "Dense", "units": 128, "activation": "relu"},
      {"type": "Dropout", "rate": 0.3},
      {"type": "Dense", "units": 64, "activation": "relu"},
      {"type": "Dense", "units": 10, "activation": "softmax"}
    ]
  },
  "training": {
    "optimizer": {
      "type": "Adam",
      "learning_rate": 0.001,
      "beta1": 0.9,
      "beta2": 0.999
    },
    "loss_function": "categorical_crossentropy",
    "epochs": 50,
    "batch_size": 32,
    "validation_split": 0.15,
    "metrics": ["accuracy"]
  },
  "data": {
    "train_path": "/data/mnist/train",
    "test_path": "/data/mnist/test",
    "image_size": [28, 28],
    "num_classes": 10
  },
  "output": {
    "model_save_dir": "./saved_models/mnist_ffn"
  },
  "environment": {
    "device": "cuda",
    "random_seed": 42
  }
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Example 2: Configuration for a Convolutional Neural Network (CNN)
        </h3>
        <p>A more complex model like a CNN requires specifying convolutional layers, pooling, etc.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`{
  "model": {
    "type": "CNN",
    "input_shape": [32, 32, 3],
    "layers": [
      {
        "type": "Conv2D",
        "filters": 32,
        "kernel_size": [3, 3],
        "activation": "relu",
        "padding": "same"
      },
      {"type": "MaxPooling2D", "pool_size": [2, 2]},
      {
        "type": "Conv2D",
        "filters": 64,
        "kernel_size": [3, 3],
        "activation": "relu",
        "padding": "same"
      },
      {"type": "MaxPooling2D", "pool_size": [2, 2]},
      {"type": "Flatten"},
      {"type": "Dense", "units": 128, "activation": "relu"},
      {"type": "Dropout", "rate": 0.5},
      {"type": "Dense", "units": 10, "activation": "softmax"}
    ]
  },
  "training": {
    "optimizer": {"type": "SGD", "learning_rate": 0.01, "momentum": 0.9},
    "loss_function": "categorical_crossentropy",
    "epochs": 100,
    "batch_size": 64
  },
  "data": {
    "dataset_name": "CIFAR10",
    "normalize_mean": [0.4914, 0.4822, 0.4465],
    "normalize_std": [0.2023, 0.1994, 0.2010]
  }
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example 3: Configuration for Data Preprocessing Pipeline</h3>
        <p>Configuration isn&apos;t limited to the model itself; it can define how data is prepared.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`{
  "data_pipeline": {
    "source": {
      "type": "CSV",
      "path": "/datasets/customer_churn.csv",
      "encoding": "utf-8"
    },
    "steps": [
      {"type": "DropColumns", "columns": ["customerID"]},
      {
        "type": "HandleMissingValues",
        "strategy": "impute",
        "columns": ["TotalCharges"],
        "method": "median"
      },
      {
        "type": "EncodeCategorical",
        "columns": ["gender", "Partner", "Dependents"],
        "method": "one-hot"
      },
      {"type": "ScaleFeatures", "method": "standard", "exclude": ["Churn_Yes", "Churn_No"]},
      {"type": "Split", "ratio": 0.8, "stratify_by": "Churn_Yes"}
    ],
    "target_column": "Churn_Yes"
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="mr-2 text-teal-600" />
          Loading and Using JSON Configuration Programmatically
        </h2>
        <p>
          In your ML code (e.g., Python with TensorFlow/PyTorch, or perhaps a Node.js backend handling ML model
          serving), you would load this JSON file and use the values to set up your model, trainer, and data loaders.
        </p>
        <p>Here&apos;s a conceptual illustration of how you might load and access configuration data:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Python Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import json
# Assuming config_example.json contains the data from Example 1

def load_config(config_path):
    """Loads configuration from a JSON file."""
    with open(config_path, 'r') as f:
        config = json.load(f)
    return config

# Load the configuration
config = load_config("config_example.json")

# Accessing configuration values
model_type = config["model"]["type"]
input_dim = config["model"]["input_dim"]
first_layer_units = config["model"]["layers"][0]["units"]

optimizer_type = config["training"]["optimizer"]["type"]
learning_rate = config["training"]["optimizer"]["learning_rate"]

train_data_path = config["data"]["train_path"]

# Now use these variables to build and train your model...
# e.g., model = build_model(model_type, config["model"]["layers"])
#       optimizer = create_optimizer(optimizer_type, learning_rate)
#       train(model, data_path=train_data_path, epochs=config["training"]["epochs"], ...)

print(f"Model Type: {model_type}")
print(f"Input Dimension: {input_dim}")
print(f"First Layer Units: {first_layer_units}")
print(f"Optimizer Type: {optimizer_type}")
print(f"Learning Rate: {learning_rate}")
print(f"Training Data Path: {train_data_path}")
`}
            </pre>
          </div>
        </div>
        <p>
          This separation allows you to change hyperparameters or swap out model components by simply editing the JSON
          file, without altering the core training or model definition code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-2 text-blue-600" />
          Structuring Your JSON
        </h2>
        <p>
          How you structure your JSON can significantly impact its readability and maintainability. Consider these
          patterns:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Flat Structure:</strong> Suitable for very simple configurations, but can become unwieldy as
            complexity grows.
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2">
              <pre>{`{"lr": 0.001, "epochs": 10, "model_name": "simple_model"}`}</pre>
            </div>
          </li>
          <li>
            <strong>Hierarchical Structure (as in examples above):</strong> Grouping related settings under logical keys
            (e.g., "model", "training", "data") is generally the best practice for clarity and organization.
          </li>
          <li>
            <strong>Modular Structure:</strong> For very large projects, you might split configurations into multiple
            JSON files (e.g., <code>model.json</code>, <code>training.json</code>, <code>data.json</code>) and have a
            main configuration file reference or include them.
          </li>
        </ul>
        <p>
          Choose a structure that reflects the complexity of your project and makes it easy for anyone (including your
          future self) to understand and modify.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-red-600" />
          Considerations: Validation and Defaults
        </h2>
        <p>
          While JSON is flexible, it doesn&apos;t inherently enforce structure or data types. For robust applications,
          especially in collaborative environments, consider:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Validation:</strong> Use tools like JSON Schema to define the expected structure, data types, and
            constraints of your configuration JSON. This allows you to validate the configuration file before using it,
            catching errors early.
          </li>
          <li>
            <strong>Default Values:</strong> Implement logic in your code to provide default values for optional
            configuration parameters. This keeps the JSON clean by only requiring essential parameters, while allowing
            customization for advanced settings.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON provides a powerful, flexible, and widely-compatible format for managing machine learning configurations.
          By clearly structuring hyperparameters, model details, training settings, and data parameters in JSON files,
          developers can achieve greater reproducibility, facilitate experimentation, and improve the overall
          maintainability of their ML projects. Coupling this with good practices like validation and handling default
          values makes for a robust configuration system.
        </p>
      </div>
    </>
  );
}
